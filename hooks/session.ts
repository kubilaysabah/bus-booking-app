'use client';

import { useState, useEffect } from "react";
import type { SessionPayload } from '@/lib/session'
import { getSession } from "@/lib/session";

export default function useSession() {
    const [session, setSession] = useState<SessionPayload | null>(null)

    useEffect(() => {
        void (async (): Promise<void> => {
            const sessionData = await getSession()
            if(!sessionData) {
                return;
            }
            setSession(sessionData)
        })();
    }, []);

    return session
}