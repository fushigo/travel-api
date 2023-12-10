import { apiKey, cors, middleware } from "@/helpers/middleware";
import { Request, Response } from "express";
import prisma from "../../../../prisma/client";

export default async function handler(req: Request, res: Response) {
  middleware(req, res, cors);
  apiKey(req, res);

  const { id, productId } = req.query;

  if (req.method === "DELETE") {
    try {
      const deleteCart = await prisma.cart.delete({
        where: {
          userId: Number(id),
          cartProductId: Number(productId),
        },
      });

      res.status(2001).json({
        message: "Cart deleted successfully",
        data: deleteCart,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
