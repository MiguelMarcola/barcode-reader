import { Router } from "express";

import { BarcodeReaderController } from "../../../modules/barcode/useCases/barcodeReaderController";

const barcodeReaderRoutes = Router();

const barcodeReaderController = new BarcodeReaderController();

barcodeReaderRoutes.get("/:barcode", barcodeReaderController.handle);

export { barcodeReaderRoutes };
