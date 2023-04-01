import { Router } from "express"
import { test } from "@/controllers/test.controller"

const router = Router()

router.get("/ping", test)

export default router
