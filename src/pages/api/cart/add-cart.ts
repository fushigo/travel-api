import { cors, middleware, apiKey } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";
export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);
  apiKey(req, res);

  if (req.method === "POST") {
    const { id, productId, quantity } = req.body;

    try {
      const user = await prisma.users.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          cart: {
            include: {
              product: true,
            },
          },
        },
      });

      const product = await prisma.product.findUnique({
        where: {
          productId: Number(productId),
        },
      });

      const cart = await prisma.cart.create({
        data: {
          userId: Number(user?.id),
          quantity: Number(quantity),
          cartProductId: Number(product?.productId),
        },
      });

      res.status(201).json({
        message: "Cart successfully created",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }
}
