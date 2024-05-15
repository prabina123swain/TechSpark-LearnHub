import React from 'react'
import { Link } from 'react-router-dom'

function Button({children , active, linkto }) {
  return (
    <Link to={linkto}>
    <div className={`text-center text-lg px-4 py-4 rounded-md font-mono hover:scale-95 transition-all duration-200 font-semibold leading-5 flex items-center gap-3 w-fit
        ${active ? "bg-[#fd4a18] text-white hover:bg-[#fdfbfc] hover:text-[#fd4a18]":
        "bg-[#0011a7] text-white hover:bg-[#fdfbfc] hover:text-[#0011a7]"}`}>
        {children}
    </div>
    </Link>
   )
}

export default Button