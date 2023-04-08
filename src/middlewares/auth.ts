import { Request, Response, NextFunction } from "express"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const Auth = {
  async private(req: Request, res: Response, next: NextFunction) {
    let sucess = false

    if (req.headers.authorization) {
      try {
        const [authType, token] = req.headers.authorization.split(" ")
        if (authType === "Bearer") {
          JWT.verify(token, process.env.JWT_SECRET_KEY as string)

          sucess = true
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (sucess) {
      next()
    } else {
      res.status(403)
      res.json({ error: "Don't have permission" })
    }
  },
}
