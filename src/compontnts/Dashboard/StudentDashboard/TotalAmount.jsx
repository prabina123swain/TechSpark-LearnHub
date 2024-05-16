import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BuyCourse } from "../../../services/operations/PaymentProcess";

export default function TotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state)=>state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    BuyCourse({token, courses, user_details:user, navigate, dispatch});
  };

  return (
    <div className="w-full mb-4 rounded-md border-2 border-richblack-700 bg-white p-6 flex items-center space-x-10 justify-center">
      <p className="mb-1 text-3xl font-medium text-richblack-400">Total: ₹ {total}</p>
      <button onClick={handleBuyCourse} className=" bg-blue-500 text-white px-4 py-2 font-bold text-xl rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Buy Now</button>
    </div>
  );
}
