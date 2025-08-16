import axios from "axios";
import { useEffect, useState } from "react";
import { MdSystemUpdateAlt } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const AllExpenses = () => {

    const [expenses , setExpenses] = useState([]);

    const handleDelete = id => {
        Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    .then( async (result) => {
        if(result.isConfirmed){
            const res = await axios.delete(`http://localhost:5000/expenses/${id}`);
            if(res.data.deletedCount > 0){
                  Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Deleted Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        setExpenses(expenses.filter(exp=> exp._id !==id))
            }
        }
    })
    }
    useEffect(() => {
        axios.get('http://localhost:5000/expenses')
        .then((res)=> {
            setExpenses(res.data);
        
        })
        .catch((error)=> {
            console.log('Error Fetching expenses' , error);
            
        })
    } , [])

    return (
        <div>
       <h2 className="font-bold text-center text-2xl mt-4 text-blue-950">ALL EXPENSES</h2>
       <h2 className="font-bold ml-26 text-2xl mt-4 text-blue-950">Total Expense: {expenses.length}</h2>
<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4 w-10/12 mx-auto">
  <table className="table">
    {/* head */}
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
      {
        expenses.map((expense , index)=> (
             <tr key={index}>
        <th>{index+1}</th>
        <td >{expense.title}</td>
        <td>{expense.amount}</td>
        <td className="badge  text-cyan-500 mt-2 font-bold">{expense.category}</td>
        <td>{expense.date}</td>
        {/* update  */}
        <td><Link to={`/updateinfo/${expense._id}`}><button className="text-lg text-emerald-600" ><MdSystemUpdateAlt /></button></Link></td>
        {/* delete  */}
        <td><button onClick={ () => handleDelete(expense._id)} className="text-lg text-red-600"><MdDelete /></button></td>

      </tr>))
     
      }
    
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllExpenses;