import { Basket } from "./basket.entity";
import { ProductsDetails } from "./products-details.entity";
export declare class Products {
    id: number;
    name: string;
    season: string;
    bodyPart: string;
    type: string;
    price: number;
    photosName: string | null;
    review: number;
    reviewAmount: number;
    detail: ProductsDetails;
    basket: Basket;
    order: Basket;
}
