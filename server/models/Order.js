import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                title: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                measure: {
                    type: String,
                },
            }
        ],
        amount: {
            type: Number,
            required: true
        },
        deliveryPrice: {
            type: Number,
            default: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
        address: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

export const Order = mongoose.model('Order', OrderSchema);
