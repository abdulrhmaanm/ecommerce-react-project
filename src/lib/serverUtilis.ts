"use server"

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getUserToken() {
  const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
  if (!encodedToken) return null;

  const decodedToken = await decode({ 
    token: encodedToken,
    secret: process.env.AUTH_SECRET!,
  });

  return decodedToken!.token; 
}

export async function getUserId() {
  const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
  if (!encodedToken) return null;

  const decodedToken = await decode({ 
    token: encodedToken,
    secret: process.env.AUTH_SECRET!,
  });

  return decodedToken!.sub; 
}