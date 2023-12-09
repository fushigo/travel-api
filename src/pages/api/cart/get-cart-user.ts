import { apiKey, cors, middleware } from "@/helpers/middleware";
import { Request, Response } from "express";
import prisma from "../../../../prisma/client";

export default async function handler(req: Request, res: Response) {
  middleware(req, res, cors);
  apiKey(req, res);

  const { id } = req.body;

  if (req.method === "GET") {
    try {
      const userCart = await prisma.users.findUnique({
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

      const totalHarga = userCart?.cart.map((items, key) => {
        return items.product.harga * items.quantity;
      });

      res.status(201).json({
        message: "Cart found successfully",
        data: userCart,
        totalHarga: totalHarga,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
