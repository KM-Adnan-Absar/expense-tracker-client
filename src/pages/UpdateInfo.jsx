import axios from "axios";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateInfo = () => {

    const { title, amount, category, date, _id } = useLoaderData();
    console.log('Expense ID:', _id);
    const { register, handleSubmit, } = useForm()
    const navigate = useNavigate()
    const onSubmit = async (data) => {

        const res = await axios.patch(`http://localhost:5000/expenses/${_id}`, data)

        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'Expense Successfully Updated',
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/allexpenses')
        }
        console.log(data);

    }


    return (
        <div>
            <h2 className="font-bold text-center text-2xl mt-4 text-blue-950">UPDATE EXPENSE</h2>
            <form className="mb-12  w-6/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>

                {/* Title  */}
                <div className="form-control  my-6 ">
                    <label className="label">
                        <span className="label-text font-bold">Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Title"
                        {...register('title', { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                {/* Amount  */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text font-bold">Amount</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter amount"
                        {...register('amount', { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Category  */}
                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text font-bold">Category</span>
                    </label>

                    <select defaultValue="default" {...register('category', { required: true })}
                        className="select select-bordered w-full">
                        <option disabled value="default">Select a category</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="shopping">Shopping</option>
                        <option value="others">Others</option>

                    </select>
                </div>


                {/* Date  */}
                <div className="form-control  my-6 ">
                    <label className="label">
                        <span className="label-text font-bold">Date</span>
                    </label>
                    <input
                        type="date"
                        placeholder="Date"
                        {...register('date', { required: true })}
                        required
                        className="input input-bordered w-full"
                    />
                </div>


                <button type="submit" className="btn btn-primary ">UPDATE EXPENSE</button>
            </form>
        </div>
    );
};

export default UpdateInfo;