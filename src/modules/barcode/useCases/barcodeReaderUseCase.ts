import { AppError } from "../../../errors/App.Error";
import { isNumber } from "../../../utils/OnlyNumbersValidation";
import { BarcodeTitulo } from "../repository/barcodeTitulo";

interface IBarcodeInfos {
    barcode: string;
    amount: number;
    expirationDate: string;
}

interface IDocProps {
    teste: boolean;
    barcodeFormat: string;
    value: number;
    date: string;
}

class BarcodeReaderUseCase {
    execute(barcode: string): IBarcodeInfos {
        const isBarcodeOnlyNumbers = isNumber(barcode);

        const doc = new BarcodeTitulo(barcode);

        if (!isBarcodeOnlyNumbers) {
            throw new AppError("Barcode format is invalid!");
        }

        return {
            barcode: doc.barcodeFormat,
            amount: doc.value,
            expirationDate: doc.date,
        };
    }
}

export { BarcodeReaderUseCase };
