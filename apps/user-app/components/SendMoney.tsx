"use client"

import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { TextInput } from "@repo/ui/inputbox"
import { useState } from "react"
import { p2p } from "../app/lib/actions/p2p"

export const SendMoney = () => {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0);

    return(
    <Card title="Send Money">
        <Center>
        <div className="min-w-96">
            <div className="m-2">
         <TextInput label={"Enter Amount"} placeholder={"Amount"} onChange={(val) => {
        setAmount(Number(val))
        }} />
         <TextInput label={"upi id/username/number"} placeholder={"upi id/username/number"} onChange={(val) => {
        setNumber(val)
        }} />
        <div className="flex justify-center pt-6">
        <Button onClick={async() => {
            await p2p(number, amount*100)
            }}>
            Send Money
            </Button>
            </div>
            </div>
    </div>
    </Center>
    </Card>
    )
}