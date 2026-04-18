import { cookies } from "next/headers";

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8000/api/v1";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

/**
 * Core primitive to fetch data from the Internal API Gateway.
 * It automatically grabs the JWT token from cookies if requireAuth is true.
 * Designed to be run primarily from Next.js Server Components and Server Actions.
 */
export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = true, headers, ...restOptions } = options;

  let authHeader = {};
  const cookieStore = await cookies();
  
  if (requireAuth) {
    const token = cookieStore.get("session_token")?.value;
    if (token) {
      authHeader = {
        Authorization: `Bearer ${token}`,
      };
    }
  }

  let response = await fetch(`${GATEWAY_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...headers,
    },
  });

  // Handle 401 Unauthorized (Potential Expired Token)
  if (response.status === 401 && requireAuth) {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    
    if (refreshToken) {
      console.log("[api-client] Attempting token refresh...");
      const refreshResponse = await fetch(`${GATEWAY_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (refreshResponse.ok) {
        const tokenData = await refreshResponse.json() as TokenResponse;
        
        // Try to update cookies. This only works in Server Actions or Middleware.
        // In Server Components, this will throw an error, which is caught.
        try {
          cookieStore.set("session_token", tokenData.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60,
            path: "/",
          });
          cookieStore.set("refresh_token", tokenData.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          console.log("[api-client] Token refreshed successfully.");
        } catch (e) {
          // Failure to set cookies usually means we are in a Server Component render.
          // The token is still valid for this request though!
          console.warn("[api-client] Could not update cookies (likely in a Server Component render).");
        }

        // Retry the original request with the new token
        response = await fetch(`${GATEWAY_URL}${endpoint}`, {
          ...restOptions,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData.access_token}`,
            ...headers,
          },
        });
      }
    }
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return data as T;
}
