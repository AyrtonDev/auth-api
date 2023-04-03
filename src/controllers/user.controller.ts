import { Request, Response } from "express"
import { User } from "@/models/User"

export const register = async (req: Request, res: Response) => {
  if (req.body.email && req.body.password) {
    const { email, password } = req.body

    const hasUser = await User.findOne({ where: { email } })
    if (!hasUser) {
      const newUser = await User.create({ email, password })

      res.status(201)
      res.json({ id: newUser.id, message: "New user was created" })
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
      res.json({ status: true })
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
