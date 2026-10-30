export const ATTENDANCE_OPTIONS = ["hadir", "tidak", "ragu"] as const;

export type Attendance = (typeof ATTENDANCE_OPTIONS)[number];

export const ATTENDANCE_LABEL: Record<Attendance, string> = {
  hadir: "Hadir",
  tidak: "Tidak Hadir",
  ragu: "Masih Ragu",
};

export const NAME_MAX = 60;
export const MESSAGE_MAX = 500;

export type Wish = {
  id: string;
  name: string;
  message: string;
  attendance: Attendance;
  createdAt: string;
};

export type NewWish = Pick<Wish, "name" | "message" | "attendance">;
