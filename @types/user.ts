import * as z from "zod";

const onlyCharactersRegex = /^[A-Za-z]+$/;
const atLeastOneSpecialCharacter = /[*@!#%&()^~{}]+/;
const atLeastOneUpperCharacter = /[A-Z]+/;
const atLeastOneLowerCharacter = /[a-z]+$/;
const atLeastOneNumberCharacter = /[0-9]+/;
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
    .regex(atLeastOneNumberCharacter, {
      message: "Required at least one number character",
    })
    // .regex(atLeastOneLowerCharacter, {
    //   message: "Required at least one lower character",
    // })
    .regex(atLeastOneUpperCharacter, {
      message: "Required at least one upper character",
    }),
  // .regex(atLeastOneSpecialCharacter, {
  //   message: "Required at least one special character",
  // }),
});

export type UserPersonalInformation = z.infer<typeof userPersonalInformation>;

const userPhysicalMeasurements = z.object({
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

export const userFitnessGoal = z
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
  .min(1, { message: "At least one option must be select" });

export const userFitnessExp = z.object({
  fitnessLevel: z.enum(["beginner", "intermediate", "advance"]),
  workoutFrequency: z.enum([
    "1-2 time per week",
    "3-4 time per week",
    "5+ time per week",
  ]),
});

export const user = z.union([
  userPersonalInformation,
  userPhysicalMeasurements,
  userFitnessGoal,
  userFitnessExp,
]);

export type User = z.infer<typeof user>;
