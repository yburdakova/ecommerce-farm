import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        products: [
            {
                productId:{
                    type: String,
                },
                quantity:{
                    type: Number,
                    default: 1
                },
                title: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                measure: {
                    type: String,
                    required: true
                },
            }
        ],
        amount: {
            type: Number,
            required: true
        },
        title: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                measure: {
                    type: String,
                    required: true
                },
        address:{
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
)

export const Order = mongoose.model('Order', OrderSchema);