import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);
  apiKey(req, res);

  if (req.method === "POST") {
    try {
      const { username, password } = req.body;

      const response = await prisma.users.findUnique({
        where: {
          username: username,
        },
      });

      if (response) {
        const userPassword = response.password;

        if (userPassword === password) {
          const userId = response.id;
          const token = jwt.sign({ userId }, "travelcoauth", {
            expiresIn: "1h",
          });
          res.status(200).json({
            message: "Success",
            data: {
              nama: response.nama,
              username: response.username,
              email: response.email,
              role: response.role,
            },
            token: token,
          });
        } else {
          res.status(401).json({ message: "Authentication failed" });
        }
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
