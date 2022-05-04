import { Router } from "express";

import { barcodeReaderRoutes } from "./barcodeReader.routes";

const router = Router();

router.use("/boleto", barcodeReaderRoutes);

export { router };
