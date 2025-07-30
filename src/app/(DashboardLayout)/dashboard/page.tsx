"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks, useDeleteTask } from "@/hooks/useTasks";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskFilters as TaskFiltersType } from "@/types/task";
import EmptyState from "@/components/tasks/EmptyState";
import TaskCard from "@/components/tasks/TaskCard";
import CreateTaskModal from "@/components/tasks/CreateTaskModal";
import { ToastContainer } from "react-toastify";

export default function AllTaskListPage() {
  const [filters, setFilters] = useState<TaskFiltersType>({
    page: 1,
    limit: 10,
    sortBy: "-createdAt",
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
    setIsCreateModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="h-10 bg-gray-300 rounded w-40 mb-6"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-red-600">
              Error loading tasks. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const tasks = tasksData?.data?.tasks || [];
  const pagination = tasksData?.data?.pagination;
  const hasNoTasks = tasks.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Task list</h1>
          <button
            onClick={handleAddNewTask}
            className="inline-flex items-center px-4 py-2 bg_pri text-white rounded-lg hover:bg-teal-900 cursor-pointer transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </button>
        </div>

        {/* Filters - Pass initialFilters prop */}
        <TaskFilters
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
        />

        {/* Task List or Empty State */}
        {hasNoTasks ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={() => handleDeleteTask(task._id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() =>
                setFilters({ ...filters, page: (filters.page || 1) - 1 })
              }
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
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

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
