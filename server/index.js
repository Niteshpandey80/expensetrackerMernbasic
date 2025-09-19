const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/expensedb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: String,
});
const Expense = mongoose.model("Expense", expenseSchema);


app.get('/expense', async (req, res) => {
  const expense = await Expense.find();
  res.json(expense);
});


app.post('/expense', async (req, res) => {
  try {
    const { title, amount, date } = req.body;

    if (!title || !amount || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (isNaN(amount)) {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    const newExpense = new Expense({ title, amount: Number(amount), date });
    await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});


app.delete('/expense/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
