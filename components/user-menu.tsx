"use client";

import Link from "next/link";
import { LogInIcon, UserPlus2Icon } from 'lucide-react'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SessionPayload } from "@/lib/session";
import Logout from '@/components/logout'

interface UserMenuProps {
  session: SessionPayload | null;
}

export default function UserMenu({ session }: UserMenuProps) {
  if (!session) {
    return (
      <nav className="flex flex-wrap items-center justify-center space-x-2">
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href="/login"><LogInIcon />Login</Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href="/register"><UserPlus2Icon />Register</Link>
        </Button>
      </nav>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
        {session.firstName} {session.lastName}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
