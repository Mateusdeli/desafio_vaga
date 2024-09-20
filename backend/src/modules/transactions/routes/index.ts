import { Router } from "express";
import multer, { memoryStorage } from "multer";
import transactionController from "../controllers/transaction.controller";
import importController from "../controllers/import.controller";

const router = Router();
const upload = multer({ storage: memoryStorage() });

router.post("/import", upload.single("transactions"), importController.create);
router.get("/", transactionController.getAll);

export default router;
