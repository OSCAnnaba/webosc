"use client";

import { authenticate } from "@/lib/actions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formState, formAction] = useFormState(authenticate, {
    error: null,
    message: "",
  });
  const { pending } = useFormStatus();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (formState.error == null) return;
    if (formState.error) toast.error(formState.message);
    else {
      toast.success(formState.message);
      setTimeout(() => window.location.replace("/"), 3000);
    }
  }, [formState]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <form
        action={formAction}
        className="flex flex-col items-center gap-6 bg-gray-800 p-8 rounded-lg w-full max-w-md border border-gray-600"
      >
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            required
            autoFocus
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none placeholder-gray-400"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password..."
              required
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 text-gray-400" />
              ) : (
                <EyeIcon className="w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        <button
          disabled={pending || formState.error === false}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300 disabled:bg-gray-600"
          type="submit"
          onClick={(event: FormEvent) => {
            if (pending) {
              event.preventDefault();
            }
          }}
        >
          Login
        </button>
        <Link href="/signup" className="font-normal underline text-blue-400">
          Create an account
        </Link>
      </form>
    </div>
  );
}
