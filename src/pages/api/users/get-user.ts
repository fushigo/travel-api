import { cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";

export default async function handler(req: any, res: any) {
  await middleware(req, res, cors);

  if (req.method === "GET") {
    const { skip } = req.query;
    const skipValue = skip ? parseInt(skip, 10) : 0;
    try {
      const list = await prisma.users.findMany({
        skip: skipValue,
      });

      const countData = await prisma.users.count();

      res.status(200).json({
        message: "success get products",
        totalData: countData,
        products: list,
      });
    } catch (e) {
      res.status(500).json(e);
    }
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
}
