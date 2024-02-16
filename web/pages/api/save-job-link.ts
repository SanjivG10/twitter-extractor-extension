// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const urlFilePath = "urls.txt";
  const dir = path.resolve("./public", urlFilePath);

  fs.appendFileSync(dir, req.body + "\n");

  res.status(200).json({ success: "true" });
}
