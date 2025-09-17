"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/api/actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";

type LoginFormProps = React.ComponentProps<"form">;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [state, action, pending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/profile");
    }
  }, [state, router]);

  return (
    <form
      action={action}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={pending}
            isError={Boolean(state?.email?.errors?.length)}
          />
          <FormError errors={state?.email?.errors} />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {"Forgot your password?"}
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            disabled={pending}
            isError={Boolean(state?.password?.errors?.length)}
          />
          <FormError errors={state?.password?.errors} />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        {"Don't have an account?"}
        <Link href="/register" className="underline underline-offset-4 ml-1">
          {"Register"}
        </Link>
      </div>
    </form>
  );
}
