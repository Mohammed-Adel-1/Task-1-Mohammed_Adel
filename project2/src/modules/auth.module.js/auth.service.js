import { successResponse } from "../../common/utils/response.success.js";
import * as db_service from "../../DB/db.service.js";
import { userModel } from "../../DB/models/users.model.js";

export const signup = async (req, res, next) => {
  const { userName, email, password, gender } = req.body;

  // checking if the user already exists
  if (await db_service.findOne({ model: userModel, filter: { email } })) {
    throw new Error("Email already exists", {cause: 400});
  }

  // creating the new user
  const user = await db_service.create({
    model: userModel,
    data: {
      userName,
      email,
      password,
      gender,
    },
  });

  if (!user) {
    throw new Error("Failed to create user", {cause: 400});
  }

  successResponse({
    res,
    status: 201,
    message: "User created successfully",
    date: user,
  });
};

export const getProfile = async (req, res, next) => {
  const { id } = req.params;

  // finding the existing user
  const user = await db_service.findById({model: userModel, id, select: "-password"});

  if(!user){
    throw new Error("User not exist", {cause: 404});
  }

  successResponse({
    res,
    status: 200,
    message: "User found",
    data: user,
  });
};