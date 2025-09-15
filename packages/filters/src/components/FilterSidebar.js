'use client';

import { useState } from 'react';

export function FilterSidebar({ filters = [], values = {}, onChange, onApply, onReset }) {
  const [isOpen, setIsOpen] = useState(true);
  const [localValues, setLocalValues] = useState(values);

  const handleFilterChange = (filterId, value) => {
    const newValues = { ...localValues, [filterId]: value };
    setLocalValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(localValues);
    }
  };

  const handleReset = () => {
    setLocalValues({});
    if (onChange) {
      onChange({});
    }
    if (onReset) {
      onReset();
    }
  };

  const renderFilter = (filter) => {
    switch (filter.type) {
      case 'select':
        return (
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={localValues[filter.id] || ''}
            onChange={(e) => handleFilterChange(filter.id, e.target.value)}
          >
            <option value="">All</option>
            {filter.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'multi-select':
        return (
          <div className="space-y-2">
            {filter.options?.map(opt => (
              <label key={opt.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={(localValues[filter.id] || []).includes(opt.value)}
                  onChange={(e) => {
                    const current = localValues[filter.id] || [];
                    const newValue = e.target.checked
                      ? [...current, opt.value]
                      : current.filter(v => v !== opt.value);
                    handleFilterChange(filter.id, newValue);
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'date-range':
        return (
          <div className="space-y-2">
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={localValues[filter.id]?.start || ''}
              onChange={(e) => handleFilterChange(filter.id, {
                ...localValues[filter.id],
                start: e.target.value
              })}
              placeholder="Start date"
            />
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={localValues[filter.id]?.end || ''}
              onChange={(e) => handleFilterChange(filter.id, {
                ...localValues[filter.id],
                end: e.target.value
              })}
              placeholder="End date"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-r-lg p-2 shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {filter.label}
              </label>
              {renderFilter(filter)}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={handleApply}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
        >
          Reset All
        </button>
      </div>
    </aside>
  );
}