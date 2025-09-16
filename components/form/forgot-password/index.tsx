import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ForgotPasswordFormProps = {
    className?: string
}


export default function ForgotPasswordForm({ className }: ForgotPasswordFormProps) {
    return (
        <form className={cn("flex flex-col gap-6", className)}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to reset your password
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="johndoe@mail.com" required />
                </div>
                <Button type="submit" className="w-full">
                    {'Send Reset Password E-Mail'}
                </Button>
            </div>
            <div className="text-center text-sm">
                {'Don\'t have an account?'}
                <Link href="/register" className="underline underline-offset-4 ml-1">
                    {'Register'}
                </Link>
            </div>
        </form>
    )
}