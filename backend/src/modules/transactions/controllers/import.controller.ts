import { NextFunction, Request, Response } from "express";
import importService from "../services/import.service";
import ImportTranscationsResponseDTO from "../dtos/import-transactions-response.dto";

async function create(req: Request, res: Response<{}, ImportTranscationsResponseDTO>, next: NextFunction) {
  try {
    const response = await importService.importTransactions(req.file.buffer);
    return res.status(201).send({
      message: "Importação realizada com sucesso",
      data: response,
    });
  } catch (error) {}
}

export default {
  create,
};
