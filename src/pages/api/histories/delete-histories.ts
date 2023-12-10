import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";

export default async function handler(req: any, res: any) {
  middleware(req, res, cors);
  apiKey(req, res);

  const { userId, cartId } = req.query;

  if (req.method === "DELETE") {
    try {
      const response = await prisma.history.delete({
        where: {
          userId: Number(userId),
          cartIdHistory: Number(cartId),
        },
      });

      res.status(201).json({
        message: "Successfully deleted history",
        data: response,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
