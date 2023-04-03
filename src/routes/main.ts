import { Router } from "express"
import { test } from "@/controllers/test.controller"
import * as userController from "@/controllers/user.controller"

const router = Router()

router.get("/ping", test)

router.post("/register", userController.register)
router.post("/login", userController.login)

router.get("/list", userController.list)

export default router
