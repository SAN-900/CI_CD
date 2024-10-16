import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2 max-h-60">
            { [...transactions].slice().reverse().map(t => <div className="flex justify-between p-2">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toLocaleString()}
                    </div>
                </div>
                <div className="flex flex-col justify-start">
                    {
                    t.status == "Success"?
                    <label className="flex justify-end text-sm">
                    + Rs {t.amount / 100}
                    </label>:<label className="flex justify-end text-sm">
                     Rs {t.amount / 100}
                    </label> 
                    }
                    <label className="flex justify-end text-slate-300 text-xs">
                    {t.status}
                    </label>
                </div>

            </div>)}
        </div>
    </Card>
}