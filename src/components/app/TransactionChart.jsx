import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function TransactionChart({ data }) {
    const hasData = data.some((d) => d.total > 0)

    if (!hasData) {
        return <p className="text-center text-gray-400 text-sm py-8">No expenses yet</p>
    }

    return (
        <div style={{ width: '100%', minHeight: '250px' }}>
            <LineChart responsive style={{ width: '100%', height: '250px' }} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
        </div>
    )
}