import { db } from "@/lib/db";

export function getProjectsList(skip = 0, qty = 10) {
  try {
    return db.project.findMany({
      skip: skip,
      take: qty,
      include: {
        team: true,
      },
    });
  } catch (e) {
    console.error("Error loading projects:", e);
  } finally {
    db.$disconnect();
  }
}
