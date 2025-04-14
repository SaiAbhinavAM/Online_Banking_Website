/* const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/digibank")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Failed to connect to MongoDB");
    });

// Define the schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    accountType: { type: String, required: true },
    parentName: { type: String, required: true },
    motherName: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 }
});

// Create a model from the schema
const User = mongoose.model("data", userSchema);

// Signup route
app.post("/signup1", async (req, res) => {
    const { email, password, name, age, gender, dob, accountType, parentName, motherName, balance } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("exist"); // User already exists
        }

        const newUser = new User({
            email, password, name, age, gender, dob, accountType, parentName, motherName, balance
        });

        await newUser.save();
        res.status(201).send("notexist"); // User created successfully
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Get user details
app.get("/signup1/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.json({
            name: user.name,
            age: user.age,
            gender: user.gender,
            accountType: user.accountType,
            balance: user.balance,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(8004, () => {
    console.log("Server running on http://localhost:8004");
});
 */
