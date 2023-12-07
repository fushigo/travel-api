import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);
  apiKey(req, res);

  if (req.method === "POST") {
    const { nama, harga } = req.body;
    try {
      const product = await prisma.product.create({
        data: {
          nama,
          harga: Number(harga),
        },
      });
      res.status(201).json({
        message: "success",
        data: product,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
