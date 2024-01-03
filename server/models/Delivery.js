import mongoose from 'mongoose';

const DeliverySchema = new mongoose.Schema(
    {
        cityName: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
);

export const Delivery = mongoose.model('Delivery', DeliverySchema);
