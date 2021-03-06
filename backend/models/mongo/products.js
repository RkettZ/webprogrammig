const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        productID: String,
        productName: String,
        ProductPrice: Number,
        productStock: Number,
        productUnit: String,
        
    },
    {
        timestamps: true,
        collection: "products"
    }
);

module.exports = mongoose.model("products", schema);