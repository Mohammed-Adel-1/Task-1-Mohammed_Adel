import { Router } from "express";
import { validate } from "../../common/middleware/validation.js";
import { getProfileSchema, signInSchema, signUpSchema } from "./auth.validation.js";
import { getProfile, signin, signup } from "./auth.service.js";


const authRouter = Router();

// User SignUp
authRouter.post("/signup", validate(signUpSchema), signup);

// User SignIn
authRouter.post("/signin", validate(signInSchema), signin);

// User Get profile by Id
authRouter.get("/profile/:id", validate(getProfileSchema), getProfile);




export default authRouter;