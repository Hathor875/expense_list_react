"use client";
import React from "react";

function ExpenseItem({ expense, onDelete, onShowDetails, onEdit }) {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(expense.id);
  };

  //funkcja do wywoływana dla przysiku edytuj 
  // handler onEdit przekazany przez propsy z góry
  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(expense);
  };

  return (
    <li className="expense-item" onClick={() => onShowDetails(expense)}>
      <span className="expense-details">
        <strong className="clickable">
          {expense.title}
        </strong>{" "}
        – {expense.amount} zł ({expense.category}) – {expense.date}
      </span>

      <div className="expense-actions">
        <button className="edit-button" onClick={handleEdit}>
           Edytuj
          {/* Dodanie przycisku edytuj */}
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Usuń
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
