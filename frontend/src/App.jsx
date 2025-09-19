import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [expense, setExpense] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const fetchExpense = () => {
    axios.get("http://localhost:3000/expense")
      .then(res => setExpense(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const addExpense = () => {
    if (!title || !amount || !date) return alert("Fill all fields!");
    
    axios.post("http://localhost:3000/expense", {
      title,
      amount: Number(amount), 
      date
    }).then(res => {
      setExpense([...expense, res.data]);
      setTitle(""); setAmount(""); setDate("");
    }).catch(err => console.error(err));
  };

  const deleteExpense = (id) => {
    axios.delete(`http://localhost:3000/expense/${id}`)
      .then(() => {
        setExpense(expense.filter(exp => exp._id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center '>
      <h1 className='text-xl font-bold mt-6'>Expense Tracker</h1>

     
      <div className='bg-gray-800 p-6 rounded-lg shadow-md w-96 mt-3'>
        <input
          type="text"
          placeholder='Expense Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full p-2 mb-2 rounded bg-gray-700 outline-none'
        />
        <input
          type="number"   
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='w-full p-2 mb-2 rounded bg-gray-700 outline-none'
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='w-full bg-gray-700 p-2 rounded-lg outline-none'
        />
        <button
          onClick={addExpense}
          className='w-full bg-blue-500 h-10 rounded mt-4 hover:bg-blue-600 active:scale-95 transition'
        >
          Add Expense
        </button>
      </div>

    
      <div className='w-96 mt-4'>
        {expense.map(exp => (
          <div key={exp._id} className="bg-gray-800 p-3 rounded mb-2">
            <h3>{exp.title}</h3>
            <p>Amount: ${exp.amount}</p>
            <p>Date: {exp.date}</p>
            <button
              onClick={() => deleteExpense(exp._id)}
              className='bg-red-500 px-2 py-1 rounded mt-2 hover:bg-red-600'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
