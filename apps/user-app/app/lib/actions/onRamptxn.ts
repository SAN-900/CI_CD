"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function onRampTxns(amount: number, provider: string) {
    const session = await getServerSession(authOptions);

    if(!session?.user || !session?.user.id){
        return {
            msg: "you are not logged in"
        }
    }
        const token = (Math.random() * 1000).toString();
    await prisma.onRampTransection.create({
        data: {
            provider,
            status: "Proccessing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });

    return {
        message: "Done"
    }
}