"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/inputbox";
import { onRampTxns } from "../app/lib/actions/onRamptxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
    return <Card title="Add Money">
        <Center>
    <div className="min-w-96">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
        setAmount(Number(value))
        }} />
        <div className="py-2 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-6">
            <Button onClick={async() => {
                await onRampTxns(amount, provider)
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
    </Center>
</Card>
}