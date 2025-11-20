"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      window.cookieStore.set("token", token);
      router.replace("/dashboard");
    } else {
      router.replace("/auth/login?error=missing_token");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold">Signing you in...</h2>
      <p className="text-sm text-gray-500 mt-2">
        Please wait while we verify your Google login.
      </p>

      <div className="mt-6 animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-pink-500"></div>
    </div>
  );
}
