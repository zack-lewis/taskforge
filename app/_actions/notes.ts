"use server";

import db from "@/lib/database";

export async function createNote(
  taskId: string,
  userId: string,
  timestamp: string,
  note: string,
  date: string
) {
  const newNote = await db.note.create({
    data: {
      taskId: taskId,
      userId: userId,
      timestamp: timestamp,
      data: note,
      date: date,
    },
  });

  return newNote;
}

export async function getTaskNotes(taskId: string) {
  return await db.note.findMany({ where: { taskId: taskId } });
}
