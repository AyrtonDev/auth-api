import { Request, Response } from "express"
import nodemailer from "nodemailer"

export const contact = async (req: Request, res: Response) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3f7706f5322b26",
      pass: "dd7bcf4d96e702",
    },
  })

  const message = {
    from: req.body.from,
    to: "teste@gmail.com",
    subject: req.body.subject,
    html: req.body.email,
    text: req.body.email,
  }

  const info = await transport.sendMail(message)

  console.log("Info", info)

  res.json({ status: true })
}
