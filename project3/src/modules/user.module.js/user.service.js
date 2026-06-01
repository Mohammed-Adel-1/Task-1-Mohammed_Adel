import { successResponse } from "../../common/utils/response.success.js";
import { compare } from "../../common/utils/security/hash.security.js";
import * as db_service from "../../DB/db.service.js";
import { userModel } from "../../DB/models/users.model.js";

export const updateAccount = async (req, res, next) => {
  const { userName, gender } = req.body;

  // Finding the existing user and update the new data
  const user = await db_service.findOneAndUpdate({
    model: userModel,
    filter: { _id: req.user._id },
    update: { userName, gender },
  });

  if (!user) {
    throw new Error("Failed to update account", {cause: 400});
  }

  successResponse({
    res,
    status: 200,
    message: "Account updated successfully",
    date: user,
  });
};

export const deleteAccount = async (req, res, next) => {
  const { password } = req.body;

  // Finding the existing user
  const user = await db_service.findById({
    model: userModel,
    id: req.user._id,
  });

  if (!user) {
    throw new Error("User not exist", { cause: 404 });
  }

  // Check for the password
  if (!(await compare({ plainText: password, cipherText: user.password }))) {
    throw new Error("Incorrect password", { cause: 400 });
  }

  // Delete the user
  await user.deleteOne();

  successResponse({
    res,
    status: 200,
    message: "Account deleted successfully",
  });
};
