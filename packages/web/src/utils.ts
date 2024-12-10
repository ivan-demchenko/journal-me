import type { NewRecordPayload } from "@jm/server/shared";

export const topicsNameMapping: Record<NewRecordPayload["topic"], string> = {
  "collaboration-and-teamwork": "Collaboration and teamwork",
  "feedback-and-recognition": "Feedback and recognition",
  "goals-and-progress": "Goals and progress",
  "innovation-and-creativity": "Innovation and creativity",
  "key-achievements": "Key achievements",
  "leadership-and-mentorship": "Leadership and mentorship",
  "learning-and-skill-development": "Learning and skill development",
  "mistakes-and-recovery": "Mistakes and recovery",
  "overcoming-challenges": "Overcoming challenges",
  "productivity-and-efficiency": "Productivity and efficiency",
};
