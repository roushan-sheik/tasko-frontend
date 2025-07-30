"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Edit, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

import { Task } from "@/types/task";
import { useDeleteTask, useTask, useUpdateTask } from "@/hooks/useTasks";
import StatusDropdown from "@/components/tasks/StatusDropdown";
import ConfirmationModal from "@/components/tasks/ConfirmationModal";

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const { data: taskData, isLoading, error } = useTask(taskId);
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Task["status"] | null>(
    null
  );

  const task = taskData?.data;

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "Pending":
        return "text-pink-500 bg-pink-50";
      case "InProgress":
        return "text-orange-500 bg-orange-50";
      case "Done":
        return "text-green-500 bg-green-50";
      case "Ongoing":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  const getCategoryIcon = (category: string) => {
    return (
      <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-lg">
          {category.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  const handleStatusChange = (newStatus: Task["status"]) => {
    setSelectedStatus(newStatus);
  };

  const handleSubmit = () => {
    if (!task || !selectedStatus) return;

    updateTaskMutation.mutate(
      {
        id: task._id,
        payload: { status: selectedStatus },
      },
      {
        onSuccess: () => {
          if (selectedStatus === "Done") {
            setShowSuccessModal(true);
          }
        },
      }
    );
  };

  const handleDeleteTask = () => {
    if (!task) return;

    deleteTaskMutation.mutate(task._id, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log("Edit task");
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-red-600">
            Error loading task details. Please try again.
          </p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-teal-600 font-semibold">
            {task.points} Points
          </span>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <Edit size={16} />
            Edit Task
          </button>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {/* Task Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
        <div className="flex items-start gap-6 mb-8">
          {getCategoryIcon(task.category)}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status === "InProgress" ? "In Progress" : task.status}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{task.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-8">
          <Calendar size={16} />
          <span>End Date</span>
          <span className="font-medium">
            {format(new Date(task.endDate), "EEEE, MMMM d - yyyy")}
          </span>
        </div>

        {/* Status Change Section */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Change Status
          </h3>
          <div className="max-w-xs">
            <StatusDropdown
              currentStatus={selectedStatus || task.status}
              onStatusChange={handleStatusChange}
              disabled={updateTaskMutation.isPending}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={
            !selectedStatus ||
            selectedStatus === task.status ||
            updateTaskMutation.isPending
          }
          className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {updateTaskMutation.isPending ? "Updating..." : "Submit"}
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          disabled={deleteTaskMutation.isPending}
          className="px-8 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {deleteTaskMutation.isPending ? "Deleting..." : "Delete Task"}
        </button>
      </div>

      {/* Success Modal */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onConfirm={() => {
          setShowSuccessModal(false);
          handleBack();
        }}
        title="Successfully Completed the Task!"
        message={`Congratulations! you have successfully completed the task and you got ${task.points} points.`}
        type="success"
        confirmText="Continue"
        cancelText="Stay Here"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteTask}
        title="Are you Sure!!"
        message="Do you want to delete this Task on this app?"
        type="danger"
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
}
