import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";

interface UserRequest {
  body: {
    nama: string;
    username: string;
    email: string;
    password: string;
  };
}

export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);
  apiKey(req, res);

  if (req.method === "POST") {
    const { nama, username, email, password } = (req as UserRequest).body;
    try {
      const user = await prisma.users.create({
        data: {
          nama,
          username,
          email,
          password,
        },
      });
      res.status(201).json({
        message: "success",
        data: user,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
