"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (process.env.NODE_ENV != "production") {
    if (session) {
      return (
        <>
          Signed in as {session.user?.email} <br />{" "}
          <button onClick={() => signOut()}>Sign out</button>{" "}
        </>
      );
    }
    return (
      <>
        <Card className="mx-auto max-w-sm bg-accent mt-4 md:mt-48">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn("google")}
              >
                Login with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
  return <></>;
}
