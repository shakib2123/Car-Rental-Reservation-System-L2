import { Router } from "express";

import { UserController } from "./user.controller";
import { USER_ROLES } from "./user.constant";
import { auth } from "../../middlewares/auth";

const router = Router();

router.get("/", auth(USER_ROLES.admin), UserController.getAllUser);

router.get("/:email", auth(USER_ROLES.user), UserController.getUser);

router.put("/:id", auth(USER_ROLES.user), UserController.updateUser);

router.patch("/:id", auth(USER_ROLES.admin), UserController.updateUserRole);
router.delete("/:id", auth(USER_ROLES.admin), UserController.deleteUser);

export const UserRoutes = router;
