"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { makeGravUrl } from "@/lib/gravitar";
import { useSession } from "next-auth/react";

export function NavAvatar() {
  const { data: session } = useSession();
  const gravLink = makeGravUrl(session?.user?.email);

  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar className="h-9 w-9 md:h-full md:w-full">
        <AvatarImage
          src={gravLink}
          alt={session?.user?.name || "Unknown user"}
        />
        <AvatarFallback>{session?.user?.name}</AvatarFallback>
      </Avatar>
    </Button>
  );
}
