"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { makeGravUrl } from "@/lib/gravitar";

export function NavBar({ sessionData }: { sessionData: Session | null }) {
  const { setTheme } = useTheme();
  const [theme, setLTheme] = useState("system");

  const gravLink = makeGravUrl(sessionData?.user?.email);
  let imgLink = gravLink;

  if (sessionData?.user?.image != null) {
    imgLink = sessionData.user.image;
  }

  useEffect(() => {
    setTheme(theme);
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-36 rounded-3xl justify-center"
        >
          <Avatar className="h-9 w-9 md:h-full md:w-full">
            <AvatarImage src={imgLink} alt={sessionData?.user?.name!} />
            <AvatarFallback>{sessionData?.user?.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {sessionData?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {sessionData?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Account</DropdownMenuItem>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button asChild>
            <Link href="/api/auth/signout">Log Out</Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
