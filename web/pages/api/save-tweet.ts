// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dirRelativeToPublicFolder = "jobs";

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  const job = JSON.stringify(req.body);

  const formatDate = (date: string) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const todayDateString = formatDate(new Date().toDateString());

  const filePath = path.join(dir, `${todayDateString}.json`);

  fs.writeFileSync(filePath, job);

  res.status(200).json({ success: "true" });
}
