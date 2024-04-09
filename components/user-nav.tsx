"use server";

import { getUserData } from "@/app/(app)/_actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { makeGravUrl } from "@/lib/gravitar";

export async function NavAvatar({ userId }: { userId: string }) {
  const userData = (await getUserData(userId)) || "";
  const gravLink = makeGravUrl(userData?.email);

  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <UserAvatar username={userData.username} gravlink={gravLink} />
    </Button>
  );
}

function UserAvatar({
  username,
  gravlink,
}: {
  username: string;
  gravlink: string;
}) {
  return (
    <Avatar className="h-9 w-9">
      <AvatarImage src={gravlink} alt={username} />
      <AvatarFallback>{username}</AvatarFallback>
    </Avatar>
  );
}

export async function AvatarMenuLabel({ userId }: { userId: string }) {
  const userData = (await getUserData(userId)) || "";

  return (
    <div className="flex flex-col space-y-1">
      <p className="text-sm font-medium leading-none">{userData.username}</p>
      <p className="text-xs leading-none text-muted-foreground">
        {userData.email}
      </p>
    </div>
  );
}

export async function AvatarMenuLogout({ userId }: { userId: string }) {
  return (
    <Button
      onClick={() => console.log("<not implemented> Logout user: ", userId)}
    >
      Log out
    </Button>
  );
}
