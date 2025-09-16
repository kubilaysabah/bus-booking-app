"use client";

import Link from 'next/link'
import { useActionState } from 'react'
import { register } from '@/actions/auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type RegisterFormProps = React.ComponentProps<"form">

export function RegisterForm({
  className,
  ...props
}: RegisterFormProps) {
  const [state, action, pending] = useActionState(register, null);
  console.log(state);

  return (
    <form action={action} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="firstname">Firstname</Label>
          <Input disabled={pending} id="firstname" type="text" placeholder="John" required />
          {state?.firstName?.errors && state.firstName.errors.length > 0 && (
            <ul className="space-y-2">
              {state?.firstName?.errors?.map((error, index) => (
                <li key={index}>
                  <small className="text-xs text-red-600">
                    {error}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lastname">Lastname</Label>
          <Input disabled={pending} id="lastname" type="text" placeholder="Doe" required />
          {state?.lastName?.errors && state.lastName.errors.length > 0 && (
            <ul className="space-y-2">
              {state?.lastName?.errors?.map((error, index) => (
                <li key={index}>
                  <small className="text-xs text-red-600">
                    {error}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone</Label>
          <Input disabled={pending} id="phone" type="tel" placeholder="+905554443322" required />
          {state?.phone?.errors && state.phone.errors.length > 0 && (
            <ul className="space-y-2">
              {state?.phone?.errors?.map((error, index) => (
                <li key={index}>
                  <small className="text-xs text-red-600">
                    {error}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input disabled={pending} id="email" type="email" placeholder="johndoe@mail.com" required />
          {state?.email?.errors && state.email.errors.length > 0 && (
            <ul className="space-y-2">
              {state?.email?.errors?.map((error, index) => (
                <li key={index}>
                  <small className="text-xs text-red-600">
                    {error}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input disabled={pending} id="password" type="password" required />
          <small className="text-muted-foreground">At least 8 characters long</small>
          {state?.password?.errors && state.password.errors.length > 0 && (
            <ul className="space-y-2">
              {state?.password?.errors?.map((error, index) => (
                <li key={index}>
                  <small className="text-xs text-red-600">
                    {error}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button disabled={pending} type="submit" className="w-full">
          {"Register"}
        </Button>
      </div>
      <div className="text-center text-sm">
        {'You have an account?'}
        <Link href="/login" className="underline underline-offset-4 ml-1">
          {'Login'}
        </Link>
      </div>
    </form>
  )
}
