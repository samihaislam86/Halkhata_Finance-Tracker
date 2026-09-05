function TransTable({ transactions, showAccountName = false }) {
    const sorted = [...transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    )

    return (
        <div className="divide-y border rounded-lg bg-white">
            <h1 className="text-xl font-bold text-center text-blue-800  px-2 py-2  mt-4">TRANSACTION TABLE</h1>
            {sorted.map((t) => (
                <div key={t.id} className="flex justify-between items-center px-4 py-3">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">
                            {new Date(t.date).toLocaleDateString()}
                        </span>
                        {showAccountName && (
                            <span className="text-xs text-gray-400">{t.accountName}</span>
                        )}
                    </div>
                    <span
                        className={`font-medium ${
                            t.type === "withdraw" ? "text-red-500" : "text-green-600"
                        }`}
                    >
                        {t.type === "withdraw" ? "-" : "+"}${t.amount.toFixed(2)}
                    </span>
                </div>
            ))}
            {sorted.length === 0 && (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                    No transactions yet
                </div>
            )}
        </div>
    )
}

export default TransTable;