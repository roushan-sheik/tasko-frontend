// components/tasks/TaskFilters.tsx
"use client";

import React, { useState } from "react";
import { TaskFilters as TaskFiltersType } from "@/types/task";

interface TaskFiltersProps {
  onFiltersChange: (filters: TaskFiltersType) => void;
  initialFilters?: TaskFiltersType; // Make it optional
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  onFiltersChange,
  initialFilters = {}, // Default to empty object
}) => {
  const [localFilters, setLocalFilters] =
    useState<TaskFiltersType>(initialFilters);

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "Art and Craft", label: "Art and Craft" },
    { value: "Nature", label: "Nature" },
    { value: "Family", label: "Family" },
    { value: "Sport", label: "Sport" },
    { value: "Friends", label: "Friends" },
    { value: "Meditation", label: "Meditation" },
    { value: "Collaborative Task", label: "Collaborative Task" },
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Pending", label: "Pending" },
    { value: "InProgress", label: "In Progress" },
    { value: "Done", label: "Done" },
    { value: "Ongoing", label: "Ongoing" },
  ];

  const sortOptions = [
    { value: "-createdAt", label: "Newest First" },
    { value: "createdAt", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
    { value: "-title", label: "Title Z-A" },
    { value: "-points", label: "Points High-Low" },
    { value: "points", label: "Points Low-High" },
  ];

  const handleFilterChange = (
    key: keyof TaskFiltersType,
    value: string | number
  ) => {
    const newFilters = {
      ...localFilters,
      [key]: value || undefined, // Remove empty strings
      page: 1, // Reset to first page when filters change
    };

    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleSearchChange = (searchTerm: string) => {
    const newFilters = {
      ...localFilters,
      searchTerm: searchTerm || undefined,
      page: 1,
    };

    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      page: 1,
      limit: localFilters.limit || 10,
      sortBy: "-createdAt",
    };

    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search tasks..."
            value={localFilters.searchTerm || ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={localFilters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={localFilters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            value={localFilters.sortBy || "-createdAt"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
