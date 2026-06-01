import joi from "joi";
import { general_rules } from "../../common/utils/generalRules.js";
import { genderEnum } from "../../common/enum/user.enum.js";

export const updateAccountSchema = {
  body: joi
    .object({
      userName: joi.string().trim().min(5).required(),
      gender: joi
        .string()
        .valid(...Object.values(genderEnum))
        .required(),
      id: general_rules.id.required(),
    })
    .required(),
};

export const deleteAccountSchema = {
  body: joi
    .object({
      password: general_rules.password.required(),
      id: general_rules.id.required(),
    })
    .required(),
};
