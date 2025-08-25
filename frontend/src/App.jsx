import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [expense , setExpense] = useState([]);
  const [title , setTitle ] = useState("");
  const [amount , setAmount] = useState("");
  const [date , setDate] = useState("")
  
  const  fetchExpense = ()=>{
    axios.get("http://localhost:3000/expense").then(res => set)
  } 

  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center '>
      <h1 className='text-xl font-bold  mt-22 '>Expense Tracker </h1>
      <div className='bg-gray-800 p-6 rounded-lg shadow-md w-96 mt-3'>  
          <input type="text" placeholder='Expense Title' value={title} onChange={(e)=>setTitle(e.target.value)} 
          className='w-full p-2 mb-2 rounded bg-gray-700 outline-none ' />
          <input type="text" placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)} className='w-full p-2 mb-2 rounded bg-gray-700 outline-none' />
          <input type="Date" value={date} onChange={(e)=>setDate(e.target.value)} className='w-full bg-gray-700 p-2 rounded-lg outline-none '/>
           <button className='w-full bg-blue-500 h-10 rounded mt-4 hover:bg-blue-600 active:scale-95 transition'>Add Expanse</button>
      </div>
      <div className='w-96'></div>
    </div>
  )
}

export default App
