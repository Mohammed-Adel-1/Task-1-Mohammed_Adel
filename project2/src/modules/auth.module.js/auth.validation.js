import joi from "joi";
import { general_rules } from "../../common/utils/generalRules.js";
import { genderEnum } from "../../common/enum/user.enum.js";

export const signUpSchema = {
  body: joi
    .object({
      userName: joi.string().trim().min(5).required(),
      email: general_rules.email.required(),
      password: general_rules.password.required(),
      cPassword: general_rules.cPassword.required(),
      gender: joi
        .string()
        .valid(...Object.values(genderEnum))
        .required(),
    })
    .required(),
};

export const getProfileSchema = {
  params: joi.object({
    id: general_rules.id.required()
  }).required()
};