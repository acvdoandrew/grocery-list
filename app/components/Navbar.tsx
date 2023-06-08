import React from "react"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="bg-slate-100 flex font-bold text-2xl py-3 justify-center items-center">
        <div className="mx-4 cursor-pointer">
            <Link href='/'>
                My Groceries
            </Link>
        </div>
    </div>
  )
}

export default Navbar


