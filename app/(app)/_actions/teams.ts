"use server";

import db from "@/lib/database";

export async function getTeams() {
  return db.team.findMany();
}
