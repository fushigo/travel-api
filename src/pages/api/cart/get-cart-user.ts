import { apiKey, cors, middleware } from "@/helpers/middleware";
import { Request, Response } from "express";
import prisma from "../../../../prisma/client";

export default async function handler(req: Request, res: Response) {
  middleware(req, res, cors);

  const { id } = req.query;

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

      const countCartData = userCart?.cart.length;

      const totalHarga = userCart?.cart.map((items, key) => {
        return items.product.harga * items.quantity;
      });

      const payment = totalHarga?.reduce((acc, total) => {
        return acc + total;
      }, 0);

      res.status(201).json({
        message: "Cart found successfully",
        totalCartData: countCartData,
        data: userCart,
        totalHarga: totalHarga,
        payment: payment,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
