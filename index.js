//importing libraries 
const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const { collection1, collection2 } = require('./mongodb');




app.use(express.json())
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render("login")
})

app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'public/images', filename));
});

//routing 
app.get('/home', async (req, res) => {
    try {
        const users = await collection2.find().exec();
        res.render("home", {
            users: users
        });
    } catch (err) {
        console.log("error", err);
        res.status(500).send("An error occurred");
    }
});



app.get('/add',async (req,res)=>{
    res.render("add")
})


app.post("/login", async (req,res)=>{

    try{
     const check = await collection1.findOne({name:req.body.name})
     if(check.password === req.body.password){
        const users = await collection2.find().exec();
        res.render("home", {
            users: users
        });
     }
     else
     {
        res.send("wrong password")
     }
    }
    catch{
        res.send("no user found")
    }


})
app.post("/add", async (req,res)=>{

    const data = {
        name:req.body.name,
        role: req.body.role,
        email:req.body.email,
        phone_num: req.body.phone_num,
    }

    await collection2.insertMany([data])

    const users = await collection2.find().exec();
        res.render("home", {
            users: users
        });
})
app.get("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await collection2.findById(id).exec();

        if (!user) {
            return res.redirect('/');
        }

        res.render('update', {
            user: user
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred");
    }
});
app.post('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = {
            name: req.body.name,
            role: req.body.role,
            email: req.body.email,
            phone_num: req.body.phone_num,
        };

        const result = await collection2.findByIdAndUpdate(id, updateData).exec();

        if (!result) {
            console.log("User not found for update.");
        } else {
            console.log("User updated successfully.");
        }

        res.redirect("/home");
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred");
    }
});

app.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const result = await collection2.findByIdAndRemove(id).exec();

        if (!result) {
            console.log("User not found for deletion.");
        } else {
            console.log("User deleted successfully.");
        }

        res.redirect("/home"); // Make sure this route is correct
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("An error occurred");
    }
});


app.listen(3000,()=>{
    console.log("begin ra")
})
