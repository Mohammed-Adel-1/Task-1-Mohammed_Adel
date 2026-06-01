import { Router } from "express";
import { authentication } from "../../common/middleware/authentication.js";
import { validate } from "../../common/middleware/validation.js";
import { deleteAccountSchema, updateAccountSchema } from "./user.validation.js";
import { deleteAccount, updateAccount } from "./user.service.js";


const userRouter = Router();


// Update user account
userRouter.patch("/update", validate(updateAccountSchema), updateAccount);

// Delete user account
userRouter.delete("/delete", validate(deleteAccountSchema), deleteAccount);




export default userRouter;