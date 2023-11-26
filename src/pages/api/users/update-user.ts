import { cors, middleware } from "@/helpers/middleware";
import prisma from "../../../../prisma/client";

export default async function handler(req: any, res: any) {
  await middleware(req, res, cors);

  if (req.method === "PUT" || req.method === "PATCH") {
    const { nama, username, email, password, role } = req.body;
    const { id } = req.query;
    try {
      const updateUser = await prisma.users.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nama,
          username,
          email,
          password,
          role,
        },
      });
      res.status(200).json({ message: "Success update data", updateUser });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ message: "Access Denied" });
  }
}
