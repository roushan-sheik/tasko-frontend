"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskFilters as TaskFiltersType } from "@/types/task";
import EmptyState from "@/components/tasks/EmptyState";
import TaskCard from "@/components/tasks/TaskCard";

export default function AllTaskListPage() {
  const [filters, setFilters] = useState<TaskFiltersType>({
    page: 1,
    limit: 10,
    sortBy: "-createdAt",
  });

  const { data: tasksData, isLoading, error } = useTasks(filters);
  const deleteTaskMutation = useDeleteTask();

  const handleFiltersChange = (newFilters: TaskFiltersType) => {
    setFilters(newFilters);
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleAddNewTask = () => {
    // TODO: Implement add new task functionality
    console.log("Add new task");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-600">Error loading tasks. Please try again.</p>
        </div>
      </div>
    );
  }

  const tasks = tasksData?.data?.tasks || [];
  const pagination = tasksData?.data?.pagination;
  const hasNoTasks = tasks.length === 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">All Task list</h1>
        <button
          onClick={handleAddNewTask}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          <Plus size={20} />
          Add New Task
        </button>
      </div>

      {/* Filters */}
      <TaskFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Task List or Empty State */}
      {hasNoTasks ? (
        <EmptyState onAddTask={handleAddNewTask} />
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() =>
              setFilters({ ...filters, page: (filters.page || 1) - 1 })
            }
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          <span className="px-4 py-2 text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <button
            onClick={() =>
              setFilters({ ...filters, page: (filters.page || 1) + 1 })
            }
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
