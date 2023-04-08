import { Router } from "express"
import { test } from "@/controllers/test.controller"
import * as userController from "@/controllers/user.controller"
import * as emailController from "@/controllers/email.controller"
import { Auth } from "@/middlewares/auth"

const router = Router()

router.get("/ping", test)

router.post("/register", userController.register)
router.post("/login", userController.login)

router.get("/list", Auth.private, userController.list)

router.post("/contact", emailController.contact)

export default router
