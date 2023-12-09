import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);
  apiKey(req, res);

  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const deleteProduct = await prisma.product.delete({
        where: {
          productId: Number(id),
        },
      });
      res.status(200).json({
        message: "Product deleted successfully",
        data: deleteProduct,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
