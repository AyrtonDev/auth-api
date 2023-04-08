import { Request, Response } from "express"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "@/models/User"

dotenv.config()

export const register = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    const { email, password } = req.body

    const hasUser = await User.findOne({ where: { email } })
    if (!hasUser) {
      const newUser = await User.create({ email, password })

      const token = JWT.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET_KEY as string
      )

      res.status(201)
      res.json({ id: newUser.id, token, message: "New user was created" })
    } else {
      res.json({ error: "E-mail has been exist" })
    }
  }

  res.json({ error: "E-mail and/or password was not send" })
}

export const login = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    const email: string = req.body.email
    const password: string = req.body.password
    const user = await User.findOne({
      where: { email, password },
    })

    if (user) {
      const token = JWT.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string
      )

      res.json({ status: true, token })
    }
  }
  res.json({ status: false })
}

export const list = async (req: Request, res: Response) => {
  const users = await User.findAll()
  const list: string[] = []

  users.map((user) => {
    list.push(user.email)
  })

  res.json({ list })
}
