import { cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";

export default async function handler(req: any, res: any) {
  await middleware(req, res, cors);

  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const deleteUser = await prisma.users.delete({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json({ message: "Success delete data", deleteUser });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Access Denied" });
  }
}
