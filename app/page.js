"use client";
import React from "react";
import ExpenseList from "./components/ExpenseList";

function Home() {
  return (
    <div>
      <h1>Strona główna</h1>
      <ExpenseList />
    </div>
  );
}

export default Home;
