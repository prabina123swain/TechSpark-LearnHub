import { useSelector } from "react-redux"
import TotalAmount from "./TotalAmount"
import CartItem from "./CartItem"

export default function Cart() {
  const { total } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  return (
    <div className="p-5 ">
      <h1 className="mb-14 text-3xl font-medium text-richblack-800 border-b border-b-richblack-400 pb-4 mx-auto flex items-center justify-center">My Cart</h1>

  
      {total > 0 ? (
        <div className=" mt-8 flex items-start justify-center flex-col">
          <CartItem />
          <TotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  )
}
