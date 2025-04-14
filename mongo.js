const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/DIGIBANK1")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const userSchema = new mongoose.Schema({
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        fatherName: { type: String, required: true },
        motherName: { type: String, required: true },
        dob: { type: Date, required: true },
        age: { type: Number, required: true },
        balance: { type: Number, required: true, default: 0 },
        gender: { type: String, required: true },
        creditCard: { 
            cardNumber: { type: String },
            expiryDate: { type: String },
            cvv: { type: String },
            cardHolderName: { type: String },
        }
    });

const collection = mongoose.model("collection",userSchema)

module.exports=collection
