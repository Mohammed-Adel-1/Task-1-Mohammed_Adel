import { randomUUID } from "crypto";
import { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } from "../../../config/config.service.js";
import { successResponse } from "../../common/utils/response.success.js";
import { compare, hash } from "../../common/utils/security/hash.security.js";
import * as db_service from "../../DB/db.service.js";
import { userModel } from "../../DB/models/users.model.js";
import { generateToken } from "../../common/utils/token.service.js";

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
      password: hash({ plainText: password }),
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Finding the existing user
  const user = await db_service.findOne({
    model: userModel,
    filter: { email },
  });

  if (!user) {
    throw new Error("Invalid email", {cause: 404});
  }

  // Checking if the password is correct
  if (!compare({ plainText: password, cipherText: user.password })) {
    throw new Error("Incorrect password", {cause: 400});
  }

  const jwtid = randomUUID();

  // Generating access token
  const access_token = generateToken({
    payload: { id: user._id, email: user.email },
    secret_key: ACCESS_SECRET_KEY,
    options: {
      expiresIn: 60 * 5,
      jwtid,
    },
  });

  // Generating refresh token
  const refresh_token = generateToken({
    payload: { id: user._id, email: user.email },
    secret_key: REFRESH_SECRET_KEY,
    options: {
      expiresIn: "1y",
      jwtid,
    },
  });

  successResponse({
    res,
    status: 200,
    message: "User signedin successfully",
    data: {access_token, refresh_token},
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