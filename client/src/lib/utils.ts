import { useContext } from "react";
import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

import { ThemeProviderContext, type ThemeProviderState } from "@/components/theme";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}

export function isAccessTokenExpired(token: string): boolean {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true;
  }
}
