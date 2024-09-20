import { NextFunction, Request, Response } from "express";
import transactionService from "../services/transaction.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  const { page, limit, name } = req.query;
  const response = await transactionService.getAll(
    Number(page),
    Number(limit),
    {
      name: name ? String(name) : null,
    }
  );
  return res.status(200).send(response);
}

export default {
  getAll,
};
