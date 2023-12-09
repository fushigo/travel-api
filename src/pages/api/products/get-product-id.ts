import { cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);

  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const list = await prisma.product.findUnique({
        where: {
          productId: Number(id),
        },
      });

      res.status(200).json({
        message: "Product found successfully",
        data: list,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
