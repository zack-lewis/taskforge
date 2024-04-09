"use client";

import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/contexts";

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
import { AvatarMenuLabel, AvatarMenuLogout, NavAvatar } from "./user-nav";
import Link from "next/link";

export function NavBar() {
  const { setTheme } = useTheme();
  const [theme, setLTheme] = useState("system");
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    setTheme(theme);
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NavAvatar userId={userContext} />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <AvatarMenuLabel userId={userContext} />
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
        <DropdownMenuItem>
          <AvatarMenuLogout userId={userContext} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
