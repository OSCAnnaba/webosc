"use client";

import { login } from "@/lib/actions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formState, formAction] = useFormState(login, {
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
      setTimeout(() => window.location.replace("/"), 1000);
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
            <span className="text-red-500 mr-1">*</span>
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email..."
            required
            autoFocus
            pattern="^[a-zA-Z0-9._+-]+\@[a-zA-Z0-9.-]+\.[a-z]{2,}$"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none placeholder-gray-400 invalid:border-red-800"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="font-medium text-white" htmlFor="password">
            <span className="text-red-500 mr-1">*</span>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password..."
              required
              minLength={8}
              className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none placeholder-gray-400 invalid:border-red-800"
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
        <div className="w-full flex items-center gap-4">
          <input
            className="w-4 h-4"
            type="checkbox"
            name="remember"
            id="remember"
          />
          remember me
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
        <div className="w-full flex flex-col items-center gap-2">
          <Link
            href="/signup"
            className="font-semibold text-blue-500 hover:text-blue-600 underline transition-colors duration-200"
          >
            Sign Up
          </Link>
          <Link
            href="/password-reset"
            className="text-sm text-gray-400 hover:text-gray-200 underline transition-colors duration-200"
          >
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  );
}
