import { cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  await middleware(req, res, cors);

  if (req.method === "GET") {
    const { skip } = req.query;
    const skipValue = skip ? Number(skip) : 0;
    try {
      const list = await prisma.users.findMany({
        skip: skipValue,
      });

      const countData = await prisma.users.count();

      res.status(200).json({
        message: "success get products",
        totalData: countData,
        data: list,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
