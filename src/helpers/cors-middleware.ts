import Cors from "cors";

export const cors: any = Cors({
  methods: ["POST", "GET", "HEAD", "PUT", "DELETE"],
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
