import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type RegisterFormProps = React.ComponentProps<"form">

export function RegisterForm({
  className,
  ...props
}: RegisterFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="firstname">Firstname</Label>
          <Input id="firstname" type="text" placeholder="John" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lastname">Lastname</Label>
          <Input id="lastname" type="text" placeholder="Doe" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+905554443322" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="johndoe@mail.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
          <small className="text-muted-foreground">At least 8 characters long</small>
        </div>
        <Button type="submit" className="w-full">
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
