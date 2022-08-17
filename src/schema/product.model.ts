import { model, Schema } from "mongoose";
import { ICategory } from "./category.model";
import { IDiscount } from "./discount.model";
import { IRestaurant } from "./restaurant.model";
import { ITag } from "./tag.model";

export interface IProduct {
    name?: string;
    price?: number;
    tag?: ITag;
    category?: ICategory;
    restaurant?: IRestaurant;
    discount?: IDiscount;
}
const productSchema = new Schema<IProduct>({
    name: String,
    price: Number,
    tag: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    discount: {
        type: Schema.Types.ObjectId,
        ref: 'Discount'
    }
})
const Product = model<IProduct>('Product', productSchema);
export {Product}