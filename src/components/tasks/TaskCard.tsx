import React from "react";
import { Calendar, Trash2 } from "lucide-react";
import { Task } from "@/types/task";
import Link from "next/link";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onDelete?: (id: string) => void;
}

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
  // You can customize this based on your categories
  return (
    <div className="w-10 h-10 bg_pri rounded-full flex items-center justify-center">
      <span className="text-white font-bold text-sm">
        {category.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Link href={`/dashboard/${task._id}`}>
          <div className="flex items-center gap-3">
            {getCategoryIcon(task.category)}
            <div>
              <h3 className="font-semibold text-gray-900 hover:text-teal-600 cursor-pointer">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            </div>
          </div>
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-500 cursor-pointer hover:text-red-700 p-1"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={14} />
          <span>{format(new Date(task.endDate), "EEEE, MMMM d - yyyy")}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
