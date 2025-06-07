import React from "react";

export default function AddExpenseButton({ onClick }) {
  return (
    // w props przekazana funkcja do wywołania onClick
    <button onClick={onClick} className="add-expense-button">
      + Dodaj wydatek
    </button>
  );
}