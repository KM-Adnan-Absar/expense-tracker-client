import axios from "axios";
import { useEffect, useState } from "react";
import { MdSystemUpdateAlt, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("https://expense-tracker-server-lemon.vercel.app/expenses", {
        params: { category: selectedCategory },
      });
      setExpenses(res.data);
    } catch (error) {
      console.log("Error fetching expenses", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Delete expense
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(`https://expense-tracker-server-lemon.vercel.app/expenses/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Deleted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setExpenses(expenses.filter((exp) => exp._id !== id));
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-center text-2xl text-blue-950">
        ALL EXPENSES
      </h2>

      {/* Filter */}
      <div className="flex justify-center gap-4 mt-6 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        <button
          onClick={fetchExpenses}
          className="bg-blue-900 font-bold text-white px-4 py-2 rounded"
        >
          Filter By Category
        </button>
      </div>

      <h2 className="text-xl font-bold text-center mt-4">
        Total Expense: {expenses.length}
      </h2>

      {/* Expense Table */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4 w-10/12 mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={expense._id}>
                <th>{index + 1}</th>
                <td>{expense.title}</td>
                <td>{expense.amount}</td>
                <td className="badge text-cyan-500 mt-2 font-bold">
                  {expense.category}
                </td>
                <td>{expense.date}</td>
                <td>
                  <Link to={`/updateinfo/${expense._id}`}>
                    <MdSystemUpdateAlt className="text-lg text-emerald-600" />
                  </Link>
                </td>
                <td>
                  <MdDelete
                    className="text-lg text-red-600 cursor-pointer"
                    onClick={() => handleDelete(expense._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllExpenses;
