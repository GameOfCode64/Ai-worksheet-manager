"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + "/auth/google";
  };

  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <Image
        src="/google.png"
        alt="Google Logo"
        width={20}
        height={20}
        className="mr-2"
      />
      Continue with Google
    </Button>
  );
}
