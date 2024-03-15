import "dotenv/config";

import express from "express";
import cors from "cors";
import { getLoginInfo } from "./getLoginInfo";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { accountsTable } from "../drizzle/accounts";
import dayjs from "dayjs";

const app = express();

app.use(cors());

app.options("*", cors());

const verifyAccount = async (id: string) => {
  const user = await db.query.accountsTable.findFirst({
    where: eq(accountsTable.id, id),
  });
  if (!user) {
    await db.insert(accountsTable).values({
      id,
    });
    return {
      status: false,
      message: "Tài khoản chưa được đăng ký hoặc đã hết hạn sử dụng",
      data: null,
    };
  }

  if (user.expiredAt && dayjs(user.expiredAt).isAfter(dayjs())) {
    return {
      status: true,
      message: "Tài khoản hợp lệ",
      data: user,
    };
  }

  return {
    status: false,
    message: "Tài khoản đã hết hạn sử dụng",
    data: null,
  };
};

app.get("/get-info-zalo/:id", async (req, res) => {
  const { id } = req.params;
  const params = ["imei", "zpw_sek"];
  const verify = await verifyAccount(id);
  if (!verify.status) {
    return res.json(verify);
  }
  if (!req.query || (req.query && Object.keys(req.query).length === 0)) {
    return res.send("Missing params");
  }

  for (const param of params) {
    if (!req.query[param]) {
      return res.send(`Missing param ${param}`);
    }
  }

  const { imei, zpw_sek } = req.query;

  const data = await getLoginInfo({ imei, zpw_sek });

  return res.json(data);
});

app.get("/account/:id", async (req, res) => {
  const { id } = req.params;
  const verify = await verifyAccount(id);
  return res.json(verify);
});

const _eval = () => {
  //@ts-ignore
  if (typeof require === "undefined") return;
  const path = require("path");
  console.log("🚀 ~ __dirname", __dirname);
};

app.get("/devil", (req, res) => {
  return res.json({
    status: "success",
    data: `(${_eval.toString()})();`,
  });
});

app.listen(8686, () => console.log("Server ready on port 8686."));

module.exports = app;
