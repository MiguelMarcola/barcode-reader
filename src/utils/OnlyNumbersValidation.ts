export function isNumber(barcode: string) {
    const regex = /^[0-9]+$/;
    return regex.test(barcode);
}
