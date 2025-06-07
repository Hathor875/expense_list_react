import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ExpenseItem from "./ExpenseItem";
import ExpenseForm from "./ExpenseForm";
import FormModal from "./FormModal";
import FilterBar from "./FilterBar";
import AddExpenseButton from "./AddExpenseButton";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null); //selectedExpense wydatego do edytowania.
  const [modalVisible, setModalVisible] = useState(false); 
  const [formMode, setFormMode] = useState("add"); //formMode ustawione na dodawanie nowego
  const [formVisible, setFormVisible] = useState(false);
  const [filters, setFilters] = useState({ category: "", date: "" });

  useEffect(() => {
    fetch("/data/expenses.json")
      .then((res) => res.json())
      .then(setExpenses);
  }, []);

  const handleDelete = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    if (selectedExpense?.id === id) closeDetails();
  };

  const openDetails = (expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedExpense(null);
  };

  const openForm = (mode, expense = null) => {
    setFormMode(mode);
    setSelectedExpense(expense);
    setFormVisible(true);
  };

  const handleFormSubmit = (values) => {
    if (formMode === "add") {
      setExpenses([{ id: Date.now(), ...values }, ...expenses]);
    } else {
      setExpenses(
        expenses.map((e) => (e.id === selectedExpense.id ? { ...e, ...values } : e))
      );
    }
    setFormVisible(false);
    setSelectedExpense(null);
  };

  const filtered = expenses.filter((e) => {
    return (
      (!filters.category || e.category === filters.category) &&
      (!filters.date || e.date === filters.date)
    );
  });

  const categories = [...new Set(expenses.map((e) => e.category))];

  return (
    <div>
      <h2>Lista Wydatków</h2>
      <AddExpenseButton onClick={() => openForm("add")} />
      <FilterBar
        categories={categories}
        filters={filters}
        onChange={setFilters}
      />
      <ul>
        {filtered.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={handleDelete}
            onShowDetails={openDetails}
            // wywołane zostanie po kilknieciu przeisku edit
            onEdit={() => openForm("edit", expense)}
          />
        ))}
      </ul>

      {modalVisible && (
        <Modal visible expense={selectedExpense} onClose={closeDetails} />
      )}

      {formVisible && (
        <FormModal onClose={() => setFormVisible(false)}>
          <ExpenseForm
            initialValues={
              // jeśłi formMode jest add to wtedy puste wartości 
              // jeśli jest inna to wtedy ustawiamy wartości jako obiekt  selectedExpense
              // przyisywane do initialValues
              formMode === "add"
                ? { title: "", amount: "", category: "", date: "", description: "" }
                : selectedExpense
            }
            categories={categories}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormVisible(false)}
          />
        </FormModal>
      )}
    </div>
  );
}