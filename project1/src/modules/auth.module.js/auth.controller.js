import { Router } from "express";
import { validate } from "../../common/middleware/validation.js";
import { getProfileSchema, signUpSchema } from "./auth.validation.js";
import { getProfile, signup } from "./auth.service.js";


const authRouter = Router();

// User SignUp
authRouter.post("/signup", validate(signUpSchema), signup);

// User Get Profile by Id
authRouter.get("/profile/:id", validate(getProfileSchema), getProfile);




export default authRouter;