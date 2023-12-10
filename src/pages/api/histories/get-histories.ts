import { apiKey, cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";

export default async function handler(req: any, res: any) {
  middleware(req, res, cors);
  apiKey(req, res);

  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      const userData = await prisma.users.findUnique({
        where: {
          id: Number(userId),
        },
        include: {
          history: true,
        },
      });
      res.status(200).json({
        message: "Successfully fetched history for user",
        data: userData,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
