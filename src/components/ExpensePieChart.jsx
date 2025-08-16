// components/ExpensePieChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ExpensePieChart = ({ expenses }) => {
  const categoryData = ['Food','Transport','Shopping','Others'].map(cat => ({
    name: cat,
    value: expenses.filter(e => e.category === cat).reduce((sum,e) => sum + Number(e.amount), 0)
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <PieChart width={400} height={300}>
      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
        {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

export default ExpensePieChart;
