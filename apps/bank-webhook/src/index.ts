import express from "express";
import db from "@repo/db/client"

const app = express();
app.use(express.json());


app.post("/hdfcwebhook", async (req, res) => {
    const paymentInfo : {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    const st = await db.onRampTransection.findUnique({
    where:{
        token: paymentInfo.token
    },
    select:  {
        status: true
    }

})
     try {
        if(st?.status === "Proccessing"){
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),
            db.onRampTransection.updateMany({
                where: {
                    token: paymentInfo.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured",
            st
        })
    }
    else {
        res.status(411).json({
            msg: "transaction may be failed or successful"
        })
    }
}
catch(e){
    console.error(e);
    res.status(411).json({
        message: "Something went wrong"
    })
}
})

app.listen(3002)