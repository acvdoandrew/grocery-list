"use client"
import GroceryPage from "./components/GroceryPage";
import Navbar from "./components/Navbar";


export default function Home() {
  return (
  <>
    <Navbar />
    <div className="bg-slate-50 min-h-screen font-light">
      <GroceryPage />
    </div>
  </>
  )
}
