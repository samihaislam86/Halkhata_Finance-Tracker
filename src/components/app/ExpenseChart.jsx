import { PieChart, Pie, Tooltip, Legend } from 'recharts'

const COLORS = ["#2563eb", "#1e293b", "#60a5fa", "#93c5fd", "#334155", "#cbd5e1"]

export default function ExpenseChart({ data }) {
  const hasData = data.some((d) => d.value > 0)

  if (!hasData) {
    return <p className="text-center text-gray-400 text-sm py-8">No spending yet</p>
  }

  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }))

  return (
    <div style={{ width: '100%', minHeight: '250px' }}>
      <PieChart responsive style={{ width: '100%', height: '250px' }}>
        <Pie
          data={coloredData}
          dataKey="value"
          nameKey="name"
          outerRadius="80%"
          innerRadius="60%"
          isAnimationActive={false}
        />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend
          layout="vertical"
          position="right"
          iconType="circle"
          wrapperStyle={{ fontSize: 12 }}
          payload={coloredData.map((entry) => ({
            value: entry.name,
            type: "circle",
            color: entry.fill,
          }))}
        />
      </PieChart>
    </div>
  )
}