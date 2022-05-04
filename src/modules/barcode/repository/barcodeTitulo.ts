/* eslint-disable no-param-reassign */
/* eslint-disable radix */
import moment from "moment";

import { AppError } from "../../../errors/App.Error";

class BarcodeTitulo {
    barcode: string;
    barcodeFormat: string;
    value: number;
    date: string;

    constructor(barcode: string) {
        this.barcode = barcode;
        this.barcodeFormat = this.formatBarcode(barcode);
        this.value = this.getValueOfBarcode(barcode);
        this.date = this.getDateTimeOfBarcode(barcode);

        if (!this.isValid(barcode)) {
            throw new AppError("Codebar is not valid!");
        }
    }

    isValid(linhaDigitavel: string): boolean {
        if (linhaDigitavel.length < 47) return false;
        if (
            this.isDvValid(linhaDigitavel.slice(0, 10), 9, 2) !==
            Number.parseInt(linhaDigitavel.charAt(9))
        )
            return false;
        if (
            this.isDvValid(linhaDigitavel.slice(10, 21), 10, 1) !==
            Number.parseInt(linhaDigitavel.charAt(20))
        )
            return false;
        if (
            this.isDvValid(linhaDigitavel.slice(21, 32), 10, 1) !==
            Number.parseInt(linhaDigitavel.charAt(31))
        )
            return false;
        return true;
    }

    isDvValid(campo: string, tamanho: number, multiplicador: number): number {
        let dv = 0;
        for (let n = 0; n < tamanho; n += 1) {
            const multiplicacao =
                Number.parseInt(campo.charAt(n)) * multiplicador;
            if (multiplicacao >= 10) dv = dv + multiplicacao - 10 + 1;
            else dv += multiplicacao;
            if (multiplicador === 1) {
                multiplicador = 2;
            } else {
                multiplicador = 1;
            }
        }
        return 10 - (dv % 10) + dv - dv;
    }

    isDvCodeValid(linhaDigitavel: string): number {
        let multiplier = 2;
        let dv = 0;
        for (let n = 43; n > 0; n -= 1) {
            let result = 0;
            if (n !== 4) {
                result = Number.parseInt(linhaDigitavel.charAt(n)) * multiplier;
                if (multiplier < 9) {
                    multiplier += 1;
                } else {
                    multiplier = 2;
                }
                dv += result;
            }
        }
        console.log(dv);
        if (dv === 11 || dv === 10 || dv === 0) dv = 1;
        console.log(dv % 11);
        return Math.abs((dv % 11) - 11);
    }

    formatBarcode(barcode: string) {
        if (barcode.length === 47) {
            const newString =
                barcode.slice(0, 9) +
                barcode.slice(10, 19) +
                barcode.slice(20, 29) +
                barcode.slice(30, barcode.length);

            return newString;
        }

        throw new AppError("Barcode format is invalid!");
    }

    getValueOfBarcode(barcode: string) {
        const value =
            parseFloat(barcode.slice(barcode.length - 10, barcode.length)) /
            100;

        return value;
    }

    getDateTimeOfBarcode(barcode: string) {
        const defaultDate = moment("1997-10-07");
        const dateBarcode = parseInt(barcode.slice(33, 37));

        const expirationDate = defaultDate
            .add(dateBarcode, "days")
            .format("DD/MM/YYYY");

        console.log(dateBarcode);

        return expirationDate;
    }
}

export { BarcodeTitulo };
