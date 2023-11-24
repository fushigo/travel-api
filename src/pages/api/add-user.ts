// import { cors, middleware } from "@/helpers/cors-middleware";
// import prisma from ;

// export default async function handler(req: any, res: any) {
//   await middleware(req, res, cors);
//   if (req.method === "POST") {
//     const { nama, username, email, password } = req.body;
//     try {
//       const user = await prisma.users.create({
//         data: {
//           nama,
//           username,
//           email,
//           password,
//         },
//       });
//       res.status(201).json({ message: "success create user", user });
//     } catch (e) {
//       res.status(500).json(e);
//     }
//   } else {
//     res.status(405).json({ message: "Access Denied" });
//   }
// }
