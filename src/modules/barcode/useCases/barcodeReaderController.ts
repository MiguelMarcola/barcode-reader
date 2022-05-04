import { Request, Response } from "express";

import { BarcodeReaderUseCase } from "./barcodeReaderUseCase";

class BarcodeReaderController {
    handle(request: Request, response: Response): Response {
        const { barcode } = request.params;

        const barcodeReaderUseCase = new BarcodeReaderUseCase();

        const barcodeInfos = barcodeReaderUseCase.execute(barcode);

        return response.status(200).json(barcodeInfos);
    }
}

export { BarcodeReaderController };
