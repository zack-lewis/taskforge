"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import db from "@/lib/database";
// import Image from "next/image";

export default async function Home() {
  async function getTasksDue(DueInDays: number) {
    const now = Date.now();
    const dayInMS = 1000 * 60 * 60 * 24;
    const today = new Intl.DateTimeFormat("en-US").format(
      now + DueInDays * dayInMS
    );
    return <></>;
  }

  function getOverdueTasks() {
    return <></>;
  }

  function getIncompleteTasks() {
    return <></>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <Card className="h-1/4">
        <CardHeader>
          <CardTitle className="flex justify-center">Due Today</CardTitle>
        </CardHeader>
        <CardContent>{getTasksDue(0)}</CardContent>
      </Card>
      <Card className="h-1/4">
        <CardHeader>
          <CardTitle className="flex justify-center">Overdue</CardTitle>
        </CardHeader>
        <CardContent>{getOverdueTasks()}</CardContent>
      </Card>
      <Card className="h-1/4">
        <CardHeader>
          <CardTitle className="flex justify-center">All Tasks</CardTitle>
        </CardHeader>
        <CardContent>{getIncompleteTasks()}</CardContent>
      </Card>
    </div>
  );
}
