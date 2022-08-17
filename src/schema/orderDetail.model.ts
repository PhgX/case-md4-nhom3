import { model, Schema } from "mongoose";
import { IOrder } from "./order.model";
import { IProduct } from "./product.model";

export interface IOrderDetail {
    product?: IProduct;
    order?: IOrder;
    price?: number;
    amount?: number;
}
const orderDetailSchema = new Schema<IOrderDetail>({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    price: Number,
    amount: Number
})
const OrderDetail = model<IOrderDetail>('OrderDetail', orderDetailSchema);
export {OrderDetail}