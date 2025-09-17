"use client";

import { useRouter } from "next/navigation";
import { useEffect, useActionState } from "react";
import { LogOutIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { logoutAction } from "@/api/actions/auth";

export default function Logout() {
    const router = useRouter();
    const [state, action, pending] = useActionState(logoutAction, null);

    useEffect(() => {
        if (state?.result) {
            router.replace("/login");
        }
    }, [state, router]);

    return (
        <form action={action}>
            <Button disabled={pending} type="submit"><LogOutIcon />Logout</Button>
        </form>
    )
}