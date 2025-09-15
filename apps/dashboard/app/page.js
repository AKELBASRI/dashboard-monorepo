'use client';

import { useState } from 'react';
import { FilterSidebar } from '@repo/filters';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@repo/ui';

// Mock production data
const mockProductionData = [
  { id: 1, name: 'Product A', status: 'active', category: 'assembly', date: '2024-01-15', quantity: 150 },
  { id: 2, name: 'Product B', status: 'completed', category: 'packaging', date: '2024-01-14', quantity: 200 },
  { id: 3, name: 'Product C', status: 'pending', category: 'quality', date: '2024-01-13', quantity: 75 },
  { id: 4, name: 'Product D', status: 'active', category: 'assembly', date: '2024-01-12', quantity: 120 },
  { id: 5, name: 'Product E', status: 'completed', category: 'packaging', date: '2024-01-11', quantity: 300 },
  { id: 6, name: 'Product F', status: 'pending', category: 'quality', date: '2024-01-10', quantity: 50 },
  { id: 7, name: 'Product G', status: 'active', category: 'assembly', date: '2024-01-09', quantity: 180 },
  { id: 8, name: 'Product H', status: 'completed', category: 'packaging', date: '2024-01-08', quantity: 250 },
];

// Filter configuration
const filterConfig = [
  {
    id: 'status',
    label: 'Production Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'completed', label: 'Completed' },
      { value: 'pending', label: 'Pending' },
    ],
  },
  {
    id: 'categories',
    label: 'Categories',
    type: 'multi-select',
    options: [
      { value: 'assembly', label: 'Assembly' },
      { value: 'packaging', label: 'Packaging' },
      { value: 'quality', label: 'Quality Control' },
    ],
  },
  {
    id: 'dateRange',
    label: 'Date Range',
    type: 'date-range',
  },
];

export default function DashboardPage() {
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(mockProductionData);

  const applyFilters = (appliedFilters) => {
    let filtered = [...mockProductionData];

    // Apply status filter
    if (appliedFilters.status) {
      filtered = filtered.filter(item => item.status === appliedFilters.status);
    }

    // Apply category filter
    if (appliedFilters.categories && appliedFilters.categories.length > 0) {
      filtered = filtered.filter(item =>
        appliedFilters.categories.includes(item.category)
      );
    }

    // Apply date range filter
    if (appliedFilters.dateRange) {
      if (appliedFilters.dateRange.start) {
        filtered = filtered.filter(item =>
          new Date(item.date) >= new Date(appliedFilters.dateRange.start)
        );
      }
      if (appliedFilters.dateRange.end) {
        filtered = filtered.filter(item =>
          new Date(item.date) <= new Date(appliedFilters.dateRange.end)
        );
      }
    }

    setFilteredData(filtered);
    setFilters(appliedFilters);
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredData(mockProductionData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <FilterSidebar
        filters={filterConfig}
        values={filters}
        onChange={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Production Dashboard</h1>
            <p className="text-gray-600">
              Monitor and manage production data with advanced filtering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{filteredData.length}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {filters.status || filters.categories?.length || filters.dateRange
                    ? 'Filtered results'
                    : 'All products'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Quantity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {filteredData.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Units produced</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-purple-600">
                  {Object.keys(filters).filter(key => {
                    const value = filters[key];
                    if (Array.isArray(value)) return value.length > 0;
                    if (typeof value === 'object') return Object.keys(value).length > 0;
                    return !!value;
                  }).length}
                </p>
                <p className="text-sm text-gray-500 mt-1">Applied filters</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Production Data</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredData.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No data matches the selected filters</p>
                  <Button
                    variant="secondary"
                    onClick={resetFilters}
                    className="mt-4"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {item.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}