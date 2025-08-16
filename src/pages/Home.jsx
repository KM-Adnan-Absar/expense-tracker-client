import { useEffect, useState } from "react";
import axios from "axios";
import ExpensePieChart from "../components/ExpensePieChart";

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get("https://expense-tracker-server-lemon.vercel.app/expenses")
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Expenses by Category</h2>
      <ExpensePieChart expenses={expenses} />
      {/* Optional: Show table below */}
      <div className="mt-8 w-10/12 mx-auto overflow-x-auto">
  <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
    <thead className="bg-blue-100">
      <tr>
        <th className="px-4 py-2 text-left text-gray-700 font-semibold">#</th>
        <th className="px-4 py-2 text-left text-gray-700 font-semibold">Title</th>
        <th className="px-4 py-2 text-right text-gray-700 font-semibold">Amount</th>
        <th className="px-4 py-2 text-center text-gray-700 font-semibold">Category</th>
        <th className="px-4 py-2 text-center text-gray-700 font-semibold">Date</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((exp, i) => (
        <tr key={exp._id} className="border-t border-gray-200 hover:bg-gray-50">
          <td className="px-4 py-2 text-left">{i + 1}</td>
          <td className="px-4 py-2 text-left">{exp.title}</td>
          <td className="px-4 py-2 text-right">{exp.amount}</td>
          <td className="px-4 py-2 text-center">
            <span className="bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full text-sm font-medium">
              {exp.category}
            </span>
          </td>
          <td className="px-4 py-2 text-center">{exp.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default Home;
