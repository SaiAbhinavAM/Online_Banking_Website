const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
            
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})


    app.post("/signup", async (req, res) => {
        const {
            email,
            password,
            name,
            fatherName,
            motherName,
            dob,
            age,
            balance,
            gender
        } = req.body;
    
        const data = {
            email,
            password,
            name,
            fatherName,
            motherName,
            dob,
            age,
            balance,
            gender
        };
    
        try {
            const check = await collection.findOne({ email });
    
            if (check) {
                res.json("exist"); 
            } else {
                await collection.insertMany([data]);
                res.json("notexist"); 
            }
        } catch (e) {
            console.error(e);
            res.json("fail");
        }
    });

    app.get("/savings/:email", async (req, res) => {  
        const { email } = req.params; 
        try {
            const user = await collection.findOne({ email }); 
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Error fetching user data", error });
        }
    });
    app.get("/profile/:email", async (req, res) => {
        const { email } = req.params; 
    
        try {
            const user = await collection.findOne({ email: email }); 
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            
            const { password, ...userData } = user._doc;  
            res.json(userData); 
        } catch (error) {
            console.error("Error fetching user data:", error);
            res.status(500).json({ message: "Error fetching user data", error });
        }
    });


app.post("/transfer", async (req, res) => {
    const { senderEmail, recipientEmail, amount } = req.body;

    try {
        const [sender, recipient] = await Promise.all([
            collection.findOne({ email: senderEmail }),
            collection.findOne({ email: recipientEmail }),
        ]);


        if (!sender || !recipient) {
            return res.status(404).json({ message: "Sender or recipient not found" });
        }

        const transferAmount = parseFloat(amount);


        if (isNaN(transferAmount) || transferAmount <= 0) {
            return res.status(400).json({ message: "Invalid transfer amount" });
        }

        if (sender.balance < transferAmount) {
            return res.status(400).json({ message: "Insufficient funds" });
        }

        const newSenderBalance = sender.balance - transferAmount;
        const newRecipientBalance = recipient.balance + transferAmount;


      

        await Promise.all([
            collection.updateOne({ email: senderEmail }, { $set: { balance: newSenderBalance } }),
            collection.updateOne({ email: recipientEmail }, { $set: { balance: newRecipientBalance } }),
        ]);


        res.json({
            message: "Transfer successful",
            senderBalance: newSenderBalance,
            recipientBalance: newRecipientBalance,
        });
    } catch (error) {
        console.error("Error during transfer:", error);
        res.status(500).json({ message: "Error during transfer" });
    }
});
app.post("/credit-card", async (req, res) => {
    const { email, cardNumber, expiryDate, cvv, cardHolderName } = req.body;

    try {
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await collection.updateOne(
            { email },
            {
                $set: {
                    creditCard: {  
                        cardNumber,
                        expiryDate,
                        cvv,
                        cardHolderName,
                    },
                },
            },
            { upsert: true }
        );

        res.json({ message: "Credit card details saved successfully" });

    } catch (error) {
        console.error("Error saving credit card details:", error);
        res.status(500).json({ message: "Failed to save credit card details" });
    }
});
app.get("/user/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.json({ name: user.name });  

    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Failed to fetch user data" });
    }
});
app.get("/insurance-plans", (req, res) => {
    const plans = [
        {
            id: 1,
            name: "Basic Plan",
            coverage: "Hospitalization, Surgery",
            premium: 100,
            benefits: ["Room charges", "Doctor fees", "ICU charges"]

        },
        {
            id: 2,
            name: "Premium Plan",
            coverage: "Comprehensive coverage",
            premium: 200,
            benefits: ["All basic plan benefits", "Maternity coverage", "Critical illness"]

        },
        
    ];
    res.json(plans);
});
app.get("/balance/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return only the balance
        res.json({ balance: user.balance }); 
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ message: "Error fetching balance" });
    }
});
app.get("/investment-plans", (req, res) => {
    const plans = [
        { id: 1, name: "Fixed Deposit", minInvestment: 1000, returns: 5, riskLevel: "Low" },
        { id: 2, name: "Mutual Funds", minInvestment: 500, returns: 8, riskLevel: "Medium" },
        { id: 3, name: "Stocks", minInvestment: 100, returns: 12, riskLevel: "High" },
    ];
    res.json(plans);
});
app.post("/transaction", async (req, res) => {
    const { email, amount, transactionType } = req.body;


    try {
        const user = await collection.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (transactionType === 'deposit') {
            user.balance += amount;
        } else if (transactionType === 'withdraw') {
            if (user.balance < amount) {
                return res.status(400).json({ message: "Insufficient funds" });
            }
            user.balance -= amount;
        }



        await collection.updateOne({ email }, { $set: { balance: user.balance } });
        res.json({ message: "Transaction successful", balance: user.balance }); // Return updated balance
    } catch (error) {
        console.error("Error during transaction:", error);
        res.status(500).json({ message: "Error during transaction", error });
    }
});


app.listen(8000,()=>{
    console.log("port connected");
})

