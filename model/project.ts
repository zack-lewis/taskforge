import { db } from "@/lib/db";

export async function getProjectsList(skip = 0, qty = 10) {
  try {
    const projectList = await db.project.findMany({
      skip: skip,
      take: qty,
    });
    return projectList;
  } catch (e) {
    console.error("Error loading projects:", e);
  } finally {
    await db.$disconnect();
  }
}
