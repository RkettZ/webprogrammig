const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        customersID: String,
        customersTitleName: String,
        customersFirstName: String,
        customersLastName: String,
        customersAddress: String,
        customersTel: String,
        customersEmail: String,
        customersUserName:String,
        customersPassword: String
    },
    {
        timestamps: true,
        collection: "customers"
    }
);

module.exports = mongoose.model("customers", schema);