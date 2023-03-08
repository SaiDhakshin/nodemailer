const express = require('express');
const nodemailer = require('nodemailer');


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.set('view engine','ejs');

app.get("/",async (req,res)=>{
    res.render('mail');
})

app.post('/mail', async(req,res)=>{
    console.log(req.body);
    let transporter = await nodemailer.createTransport({
        service : "gmail",
        port : 467,
        secure : true,
        auth : {
            user : 'saidhakshin75@gmail.com',
            pass : '<password_here>',
        },
    });
    
    let options = {
        to : req.body.email,
        from : 'saidhakshin75@gmail.com',
        subject : req.body.message,
        text : 'Hello',
        html : "<h2>Hello</h2>"
    }

    await transporter.sendMail(options , (err,info) => {
        if(err){
            console.log(err);
        }
        console.log(info.response);
    })

    res.redirect("/");
})

app.listen(port , () => {
    console.log(`Started at port ${port}`);
})
