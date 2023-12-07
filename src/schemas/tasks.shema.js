import { z } from "zod";

export const createtaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .optional(),
  date: z
    .string({
      required_error: "Date is required",
    })
    .datetime()
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .optional(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .optional(),
  date: z
    .string({
      required_error: "Date is required",
    })
    .datetime()
    .optional(),
});

export const deleteTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .optional(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .optional(),
  date: z
    .string({
      required_error: "Date is required",
    })
    .datetime()
    .optional(),
});

export const getTaskSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .optional(),
  description: z
    .string({
      required_error: "Description is required",
    })
    .optional(),
  date: z
    .string({
      required_error: "Date is required",
    })
    .datetime()
    .optional(),
});


