import mongoose from "mongoose";
const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image : {
        type: String,
        required: true,
    }
} , {
    timestamps: true,
});

const Product = mongoose.model('Product', product_schema); // 'Product' is the name of the collection in the database ,

export default Product;