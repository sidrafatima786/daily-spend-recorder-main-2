# daily-spend-recorder-main-2

Expense Report Tracker (Python CLI) is a simple command-line tool to add, view, and delete daily expenses. It uses JSON for data storage, demonstrating file handling, modular coding, and CLI logic — ideal for beginners to learn backend basics and manage spending offline via terminal.

# Expense Report Tracker (Python CLI)

A simple, terminal-based expense tracking tool built with Python. This project replicates core functionalities of modern full-stack expense apps — like adding, viewing, and deleting expenses — all in a single `.py` file, using file handling for data persistence.

---

## 📌 Description

The **Expense Report Tracker** allows users to manage their daily expenses directly from the command line. It uses a local JSON file (`expenses.json`) to save and load data, ensuring that your records persist between sessions. No external libraries required!

---

## 🔧 Features

- ➕ **Add Expense** – Enter a title, amount, and category for any expense.
- 📃 **View Expenses** – See a summary of all transactions and the total amount spent.
- ❌ **Delete Expense** – Remove an expense by selecting its number from the list.
- 💾 **Persistent Storage** – Expenses are saved in a JSON file using Python's built-in file handling.
- 🧠 **Fully Functional CLI** – User-friendly interface directly in the terminal.

---

## 💻 Technologies Used

- `Python 3`
- `JSON` for data storage
- File I/O operations (`open()`, `read()`, `write()`)

---

## 📂 Project Structure

expense_report.py         # Main executable script
expenses.json             # Data file created after running the script
README.md                 # Project overview and documentation

---

## 🚀 How to Run

1. Clone or download the repository
2. Run the script:

```bash
python3 expense_report.py

	3.	Use the numbered menu to interact with the app

🔸 Daily Expense Tracker
1. Add Expense
2. View Expenses
3. Delete Expense
4. Exit

🙋‍♂️ Author

Sidra Mustafa
Internship Project @ Vault of code – June 2025

