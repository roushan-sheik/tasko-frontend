import React from "react";

import { TaskFilters as TaskFiltersType } from "@/types/task";
import FilterDropdown from "./FilterDropdown";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
}

const categoryOptions = [
  { label: "All Categories", value: "" },
  { label: "Art and Craft", value: "Art and Craft" },
  { label: "Nature", value: "Nature" },
  { label: "Family", value: "Family" },
  { label: "Sport", value: "Sport" },
  { label: "Friends", value: "Friends" },
  { label: "Meditation", value: "Meditation" },
  { label: "Collaborative Task", value: "Collaborative Task" },
];

const statusOptions = [
  { label: "All Tasks", value: "" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "InProgress" },
  { label: "Ongoing", value: "Ongoing" },
  { label: "Done", value: "Done" },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <div className="min-w-[200px]">
        <FilterDropdown
          label="Category"
          options={categoryOptions}
          value={filters.category || ""}
          onChange={(category) =>
            onFiltersChange({
              ...filters,
              category: category || undefined,
              page: 1,
            })
          }
          placeholder="Select Task Category"
        />
      </div>
      <div className="min-w-[150px]">
        <FilterDropdown
          label="Status"
          options={statusOptions}
          value={filters.status || ""}
          onChange={(status) =>
            onFiltersChange({
              ...filters,
              status: status || undefined,
              page: 1,
            })
          }
          placeholder="All Task"
        />
      </div>
    </div>
  );
};
