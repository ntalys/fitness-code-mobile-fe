import * as z from "zod";

export const signIn = z.object({
  email: z.email({ message: "Invalid Email" }), // no internal validation
  password: z.string().min(1, { message: "Invalid Password" }), // no internal validation
});

export type SignIn = z.infer<typeof signIn>;
