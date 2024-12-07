"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function EmailBanner() {
  const path = usePathname().split("/");
  return (
    <>
      {path[1] != "email" && (
        <div className="w-full bg-red-600 p-2 flex items-center justify-center gap-6">
          <p>Account not verified!</p>
          <Link
            className="border border-white rounded-md py-1 px-2"
            href="/email/verify"
          >
            Verify
          </Link>
        </div>
      )}
    </>
  );
}
