"use client";

import Link from 'next/link'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerAction } from '@/api/actions/auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormError } from '@/components/form-error'
import { DatePicker } from '@/components/ui/datepicker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type RegisterFormProps = React.ComponentProps<"form">

export function RegisterForm({
  className,
  ...props
}: RegisterFormProps) {
  const [state, action, pending] = useActionState(registerAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/profile');
    }
  }, [state, router]);

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
          <Input
            disabled={pending}
            id="firstname"
            name="firstName"
            type="text"
            placeholder="John"
            required
            isError={Boolean(state?.firstName?.errors?.length)}
          />
          <FormError errors={state?.firstName?.errors} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lastname">Lastname</Label>
          <Input
            disabled={pending}
            id="lastname"
            name="lastName"
            type="text"
            placeholder="Doe"
            required
            isError={Boolean(state?.lastName?.errors?.length)}
          />
          <FormError errors={state?.lastName?.errors} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="turkish_identity_number">Turkish Identity Number</Label>
          <Input
            minLength={11}
            maxLength={11}
            disabled={pending}
            id="turkish_identity_number"
            name="turkish_identity_number"
            type="text"
            placeholder="12345678901"
            required
            isError={Boolean(state?.turkish_identity_number?.errors?.length)}
          />
          <FormError errors={state?.turkish_identity_number?.errors} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone</Label>
          <Input
            disabled={pending}
            id="phone"
            name="phone"
            type="tel"
            placeholder="+905554443322"
            required
            isError={Boolean(state?.phone?.errors?.length)}
          />
          <FormError errors={state?.phone?.errors} />
        </div>
        <div className="grid gap-3">
          <DatePicker
            id="birthDate"
            name="birthDate"
            label="Birth Date"
            placeholder="Select your birth date"
            disabled={pending}
            required
            maxDate={new Date()} // Bugünden sonraki tarihleri devre dışı bırak
            isError={Boolean(state?.birthDate?.errors?.length)}
          />
          <FormError errors={state?.birthDate?.errors} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender" defaultValue="Male" disabled={pending} required>
            <SelectTrigger id="gender" className={cn("w-full", state?.gender?.errors?.length && "border-red-500")}>
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormError errors={state?.gender?.errors} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled={pending}
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@mail.com"
            required
            isError={Boolean(state?.email?.errors?.length)}
          />
          <FormError errors={state?.email?.errors} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            disabled={pending}
            id="password"
            type="password"
            name="password"
            placeholder="Your password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
            isError={Boolean(state?.password?.errors?.length)}
          />
          <small className="text-muted-foreground">At least 8 characters long</small>
          <FormError errors={state?.password?.errors} />
        </div>
        <Button variant={"default"} size={"default"} disabled={pending} type="submit" className="w-full">
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
