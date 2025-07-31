import z from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  category: z.enum(
    [
      "Art and Craft",
      "Nature",
      "Family",
      "Sport",
      "Friends",
      "Meditation",
      "Collaborative Task",
    ] as const,
    {
      required_error: "Please select a category",
    }
  ),
  status: z.enum(["Pending", "InProgress", "Done", "Ongoing"] as const, {
    required_error: "Please select a status",
  }),
  endDate: z.coerce
    .date({
      errorMap: () => ({ message: "End date is required" }),
    })
    .refine((date) => date > new Date(), {
      message: "End date must be in the future",
    }),
  points: z
    .number()
    .min(1, "Points must be at least 1")
    .max(1000, "Points must be less than 1000"),
});
