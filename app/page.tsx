"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countTasksDueInRange } from "./_actions/tasks";

export default async function Home() {
  const today = new Date().toLocaleDateString();
  const yesterday = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toLocaleDateString();
  const zeroDay = new Date(0).toLocaleDateString();
  const future = new Date(3000, 1, 1).toLocaleDateString();

  const dueToday = await countTasksDueInRange(today, today);
  const overDue = await countTasksDueInRange(zeroDay, yesterday);
  const incomplete = await countTasksDueInRange(today, future);

  return (
    <div className="flex flex-col md:flex-row justify-center">
      <Card className="h-1/4 w-1/6">
        <CardHeader>
          <CardTitle className="flex justify-center">Due Today</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-6xl text-green-500">
          {dueToday}
        </CardContent>
      </Card>
      <Card className="h-1/4 w-1/6">
        <CardHeader>
          <CardTitle className="flex justify-center">Overdue</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-6xl text-red-500">
          {overDue}
        </CardContent>
      </Card>
      <Card className="h-1/4 w-1/6">
        <CardHeader>
          <CardTitle className="flex justify-center">All Tasks</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-6xl">{incomplete}</CardContent>
      </Card>
    </div>
  );
}
