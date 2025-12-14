export interface Product {
    id: string;
    name: string;
    minQuantity: number;
    buyQuantity: number;
    quantityToBuy?: number;
}
