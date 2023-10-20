import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        products: [
            {
                porductId:{
                    type: String,
                },
                quanity:{
                    type: Number,
                    default: 1
                },
            }
        ],
        amount: {
            type: Number,
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