import { apiKey, cors, middleware } from "@/helpers/middleware";
import { Request, Response } from "express";
import prisma from "../../../../prisma/client";

export default async function handler(req: Request, res: Response) {
  middleware(req, res, cors);
  apiKey(req, res);

  const { id, productId, quantity } = req.body;

  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const cartUser = await prisma.cart.update({
        where: {
          cartId: Number(id),
        },
        data: {
          quantity: Number(quantity),
        },
      });
      res.status(201).json({
        message: "Cart successfully updated",
        data: cartUser,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
