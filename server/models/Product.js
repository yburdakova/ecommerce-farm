import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        decription: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        categories: [
            {
                categoryId: {
                    type: String,
                }
            }
        ],
        measure: {
            type: String,
            default: "pcs"
        },
        price: {
            type: Number,
            required: true
        },
        inStock:{
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

export const Product = mongoose.model('Product', ProductSchema);