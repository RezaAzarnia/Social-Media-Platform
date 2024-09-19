import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("please enter your name")
    .min(3, { message: "name at least should be 3 character" })
    .max(20, { message: "name can't be more than 20 caharacter" }),
  username: z
    .string()
    .trim()
    .nonempty("please enter your username")
    .min(4, { message: "username at least should be 4 character" })
    .max(20, { message: "username can't be more than 20 caharacter" }),
  email: z
    .string()
    .trim()
    .nonempty("please enter your email")
    .email("please enter your email correctly"),

  password: z
    .string()
    .trim()
    .nonempty("please enter your password")
    .min(6, { message: "password should be at least 6 charachter" })
    .max(32, { message: "password can't be more than 32 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("please enter your email")
    .email("please enter your email correctly"),

  password: z.string().trim().nonempty("please enter your password"),
});

export const editUserSchema = z.object({
  userId: z.string().trim(),
  name: z
    .string()
    .trim()
    .nonempty("please enter your name")
    .min(3, { message: "name at least should be 3 character" })
    .max(20, { message: "name can't be more than 20 caharacter" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "password should be at least 6 charachter" })
    .max(32, { message: "password can't be more than 32 characters" })
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .trim()
    .min(4, "Please enter at least 4 characters.")
    .max(32, "Your bio can be up to 32 characters long!")
    .optional()
    .or(z.literal("")),
});
const MAX_FILE_SIZE = 5_000_000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const tagValidation = /\b\w+\b(?=\s\w+)/;

export const postSchema = z.object({
  picture: z
    .any()
    .refine(
      (file) => file !== undefined,
      "please choose a picture for your post!"
    )
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  caption: z
    .string()
    .trim()
    .min(5, "at least five character")
    .max(60, "maxmim is 60 character"),
  location: z
    .string()
    .trim()
    .nonempty("Please enter your location")
    .min(2, "Location must be at least 2 characters long")
    .max(15, "Location must not exceed 15 characters"),
  hashtags: z
    .string()
    .trim()
    .refine(
      (text) => !text.match(tagValidation),
      "please seperate the tags with , "
    )
    .optional()
    .or(z.literal("")),
});
