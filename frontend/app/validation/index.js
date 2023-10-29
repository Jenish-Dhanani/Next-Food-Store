import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  fname: z.string().min(1),
  lname: z.string().min(1),
});

export const foodItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  image: z.string().min(1),
  price: z.number().int(),
  restaurantId: z.string().min(1),
});
