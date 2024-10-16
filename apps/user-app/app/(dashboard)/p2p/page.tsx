import { getServerSession } from "next-auth/next";
import { BalanceCard } from "../../../components/BalanceCard";
import { SendMoney } from "../../../components/SendMoney";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";


async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default async function(){
    const balance = await getBalance();

    return <div className="p-4">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P Transfer
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 p-4">
            <div>
                <SendMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>
        </div>
    </div>
}