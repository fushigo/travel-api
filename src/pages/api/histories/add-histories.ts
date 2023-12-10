import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";

export default async function handler(req: any, res: any) {
  middleware(req, res, cors);
  apiKey(req, res);

  const { userId, cartId } = req.body;

  if (req.method === "POST") {
    try {
      const userData = await prisma.users.findUnique({
        where: {
          id: Number(userId),
        },
        include: {
          cart: true,
          history: true,
        },
      });

      const response = await prisma.history.create({
        data: {
          userId: Number(userData?.id),
          cartIdHistory: Number(cartId),
        },
      });

      res.status(201).json({
        message: "Successfully created history",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
