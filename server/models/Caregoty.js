import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

export const Category = mongoose.model('Category', CategorySchema);