import React from "react";
import { Plus } from "lucide-react";

interface EmptyStateProps {
  onAddTask?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddTask }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-80 h-60 relative">
          {/* Background elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-blue-100 rounded-full opacity-60"></div>
          <div className="absolute top-12 right-12 w-8 h-8 bg-green-100 rounded-full opacity-60"></div>
          <div className="absolute bottom-12 left-4 w-12 h-12 bg-pink-100 rounded-full opacity-60"></div>

          {/* Clock */}
          <div className="absolute top-4 right-8 w-12 h-12 border-2 border-blue-300 rounded-full flex items-center justify-center">
            <div className="w-1 h-4 bg-blue-400 rounded-full"></div>
            <div className="w-3 h-1 bg-blue-400 rounded-full absolute"></div>
          </div>

          {/* Main character */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              {/* Person */}
              <div className="w-24 h-32 relative">
                {/* Head */}
                <div className="w-12 h-12 bg-purple-400 rounded-full absolute top-0 left-6"></div>
                {/* Hair */}
                <div className="w-16 h-8 bg-black rounded-t-full absolute -top-2 left-4"></div>
                {/* Body */}
                <div className="w-16 h-20 bg-purple-500 rounded-t-lg absolute top-10 left-4"></div>
                {/* Arms */}
                <div className="w-4 h-12 bg-purple-400 rounded-full absolute top-12 left-0 transform -rotate-12"></div>
                <div className="w-4 h-12 bg-purple-400 rounded-full absolute top-12 right-0 transform rotate-12"></div>
              </div>

              {/* Large folder/document */}
              <div className="absolute -top-8 -right-12 w-32 h-24 bg-orange-400 rounded-lg transform rotate-12">
                <div className="w-4 h-4 bg-orange-300 rounded-br-lg absolute top-0 right-0"></div>
                <div className="absolute top-2 left-2 w-6 h-1 bg-orange-300 rounded"></div>
                <div className="absolute top-4 left-2 w-8 h-1 bg-orange-300 rounded"></div>
              </div>

              {/* Small documents */}
              <div className="absolute -top-4 -left-8 w-8 h-10 bg-white border-2 border-gray-300 rounded transform -rotate-12"></div>
              <div className="absolute -top-2 -left-4 w-8 h-10 bg-white border-2 border-gray-300 rounded transform rotate-6"></div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-16 left-16 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-8 right-4 w-2 h-2 bg-pink-400 rounded-full"></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No Task is Available yet, Please Add your New Task
      </h3>

      {onAddTask && (
        <button
          onClick={onAddTask}
          className="mt-4 flex items-center gap-2 cursor-pointer px-6 py-3 bg_pri text-white rounded-lg hover:bg-teal-800 transition-colors"
        >
          <Plus size={20} />
          Add New Task
        </button>
      )}
    </div>
  );
};

export default EmptyState;
