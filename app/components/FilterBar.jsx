import React from "react";

export default function FilterBar({ categories, filters, onChange }) {
  const handleCategory = (e) => {
    onChange({ ...filters, category: e.target.value });
  };
  const handleDate = (e) => {
    onChange({ ...filters, date: e.target.value });
  };

  return (
    <div className="filter-container">
      <label className="filter-label">
        Kategoria:
        <select
          value={filters.category}
          onChange={handleCategory}
          className="filter-select"
        >
          <option value="">Wszystkie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-label">
        Data:
        <input
          type="date"
          value={filters.date}
          onChange={handleDate}
          className="filter-date"
        />
      </label>
    </div>
  );
}