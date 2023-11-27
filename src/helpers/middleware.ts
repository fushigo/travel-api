import Cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import next from "next";

dotenv.config();

export const cors: any = Cors({
  methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
});

export function middleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export function apiKey(req: Request, res: Response) {
  const api = req.headers["x-api-key"];

  const keyValue = process.env.API_KEY;

  if (api !== keyValue) {
    return res.status(401).json({ message: "Unauthorize" });
  } else {
    return res.status(200);
  }
}
