import * as z from "zod";

const onlyCharactersRegex = /^[A-Za-z]+$/;
export const userPersonalInformation = z.object({
  fname: z
    .string()
    .min(3, { message: "First name required" })
    .max(25, { message: "Field can't be more than 25 characters" })
    .regex(onlyCharactersRegex, {
      message: "Special characters aren't allowed",
    }),
  lname: z
    .string()
    .min(3, { message: "Last name required" })
    .max(25, { message: "Field can't be more than 25 characters" })
    .regex(onlyCharactersRegex, {
      message: "Special characters aren't allowed",
    }),
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.date(),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password field required at least 8 characters" })
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one number")
    .regex(/[\W_]/, "Password must include at least one symbol"),
});

export type UserPersonalInformation = z.infer<typeof userPersonalInformation>;

export const userPhysicalMeasurements = z.object({
  height: z.object({
    value: z.preprocess(
      (val) => Number(val),
      z.number().positive("Height is required")
    ),
    unit: z.enum(["cm", "ft"]),
  }),
  weight: z.object({
    value: z.preprocess(
      (val) => Number(val),
      z.number().positive("Weight is required")
    ),
    unit: z.enum(["kg", "lbs"]),
  }),
});

export type UserPhysicalMeasurements = z.infer<typeof userPhysicalMeasurements>;

export const userFitnessGoal = z.object({
  userFitnessGoal: z
    .array(
      z.enum([
        "Weight Loss",
        "Muscle Gain",
        "Increase Strength",
        "Improve Endurance",
        "Improve Flexibility",
        "General Health",
      ])
    )
    .min(1, { message: "At least one option must be selected" }),
});

export type UserFitnessGoal = z.infer<typeof userFitnessGoal>;

export const userFitnessExp = z.object({
  fitnessLevel: z.enum(["beginner", "intermediate", "advance"]),
  workoutFrequency: z.enum([
    "1-2 time per week",
    "3-4 time per week",
    "5+ time per week",
  ]),
});

export type UserFitnessExp = z.infer<typeof userFitnessExp>;

export const acceptConditions = z.boolean().superRefine((val, ctx) => {
  if (val === false || val === undefined || val === null) {
    console.log("val: ", val);

    ctx.addIssue({
      code: "custom",
      message: "Terms and Condition must be accepted",
      input: val,
    });
  }
});

export type UserAcceptTermsAndConditions = z.infer<typeof acceptConditions>;

export const user = z.object({
  userPersonalInformation,
  userPhysicalMeasurements,
  userFitnessGoal,
  userFitnessExp,
  acceptConditions,
});

export type User = z.infer<typeof user>;
