"use client";
import React from "react";

function Modal({ visible, expense, onClose }) {
  if (!visible || !expense) return null;

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      style={overlayStyle}
    >
      <div className="modal-content" style={modalStyle}>
        <h2>{expense.title}</h2>
        <p>
          <strong>Opis:</strong> {expense.description}
        </p>
        <p>
          <strong>Kategoria:</strong> {expense.category}
        </p>
        <p>
          <strong>Kwota:</strong> {expense.amount} PLN
        </p>
        <p>
          <strong>Data:</strong> {expense.date}
        </p>
        <button onClick={onClose}>Zamknij</button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "90%",
};

export default Modal;
