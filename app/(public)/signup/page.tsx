'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signup } from "@/app/auth/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function Signup() {
  const [state, action] = useFormState(signup, undefined);

  return (
    <>
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <FeatherIcon className="h-6 w-6 absolute left-8 top-4" />
      </Link>
      <div className="flex items-center justify-center min-h-[100dvh] bg-background">
        <div className="w-full max-w-[400px] p-6 space-y-6 bg-card rounded-lg shadow-lg border border-gray-100 mt-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold mt-4">Create an Account</h1>
            <p className="text-muted-foreground">Get started with our platform today.</p>
          </div>
          <form className="space-y-4" action={action}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" />
              {state?.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="example@email.com" />
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Enter a secure password" />
              {state?.errors?.password && (
                <div className="text-sm text-red-500">
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {state?.message && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}
            <SignupButton />
          </form>
          <div className="text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline" prefetch={false}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? 'Submitting...' : 'Sign up'}
    </Button>
  );
}

function FeatherIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15H9" />
    </svg>
  );
}
