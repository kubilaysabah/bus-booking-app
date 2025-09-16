'use client';

import { useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { Button } from '@/components/ui/button';

const queryClient = new QueryClient()

export default function Panel() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const togglePanel = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {/* The rest of your application */}
            <Button
                className="fixed bottom-4 right-4 z-50"
                variant={"default"}
                onClick={togglePanel}
            >
                {`${isOpen ? 'Close' : 'Open'} the devtools panel`}
            </Button>
            {isOpen && <ReactQueryDevtoolsPanel style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', height: '50vh' }} onClose={togglePanel} />}
        </QueryClientProvider>
    )
}