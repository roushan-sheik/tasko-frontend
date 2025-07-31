import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Task } from "@/types/task";

interface StatusDropdownProps {
  currentStatus: Task["status"];
  onStatusChange: (status: Task["status"]) => void;
  disabled?: boolean;
}

const statusOptions: { label: string; value: Task["status"] }[] = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "InProgress" },
  { label: "Ongoing", value: "Ongoing" },
  { label: "Done", value: "Done" },
];

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  currentStatus,
  onStatusChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = statusOptions.find(
    (option) => option.value === currentStatus
  );

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center justify-between w-full px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-gray-700">
          {selectedOption ? selectedOption.label : currentStatus}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onStatusChange(option.value);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              <span>{option.label}</span>
              {currentStatus === option.value && (
                <Check size={14} className="text-teal-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default StatusDropdown;
