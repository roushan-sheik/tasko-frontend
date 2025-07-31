"use client";

import React, { useState, useRef } from "react";
import { useSpinWheelTasks } from "@/hooks/useTasks";
import { Task } from "@/types/task";

// Define wheel segments with colors exactly matching the Figma design
const WHEEL_SEGMENTS = [
  { name: "Friends", color: "#98DF8A", textColor: "#065F46" },
  { name: "Sport", color: "#1F77B4", textColor: "#FFFFFF" },
  { name: "Family", color: "#AEC7E8", textColor: "#3730A3" },
  { name: "Nature", color: "#FF7F0E", textColor: "#FFFFFF" },
  { name: "Meditation", color: "#2CA02C", textColor: "#FFFFFF" },
  { name: "Art and Craft", color: "#FFBB78", textColor: "#FFFFFF" },
];

const CATEGORIES = [
  "Art and Craft",
  "Nature",
  "Family",
  "Sport",
  "Friends",
  "Meditation",
] as const;

const SpinWheel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Family");
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Fetch tasks from spin-wheel endpoint using custom hook
  const {
    data: tasksResponse,
    isLoading,
    error,
  } = useSpinWheelTasks(selectedCategory);

  // Get tasks from the API response
  const tasks = tasksResponse?.data || [];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedTask(null);
  };

  const spinWheel = () => {
    if (isSpinning || tasks.length === 0) return;

    setIsSpinning(true);

    // Generate random rotation (3-5 full spins + random angle)
    const minSpins = 3;
    const maxSpins = 5;
    const spins = Math.random() * (maxSpins - minSpins) + minSpins;
    const randomAngle = Math.random() * 360;
    const totalRotation = currentRotation + spins * 360 + randomAngle;

    setCurrentRotation(totalRotation);

    // Animate the wheel
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
      wheelRef.current.style.transition =
        "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }

    // After animation completes, select a random task
    setTimeout(() => {
      const randomTaskIndex = Math.floor(Math.random() * tasks.length);
      setSelectedTask(tasks[randomTaskIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  const goToTask = () => {
    if (selectedTask) {
      // Navigate to task detail page
      window.location.href = `/dashboard/${selectedTask._id}`;
    }
  };

  return (
    <div className="min-h-screen rounded-2xl mb-20 bg-gray-50 p-6">
      <div className=" flex justify-between mx-auto">
        {/* Left Header */}
        <h1 className="text-3xl font-bold text-gray-900">Spin Wheel</h1>

        {/* Main Content */}
        <div className="flex flex-col  mt-12 items-center">
          {/* Spin Wheel Container - Exact Figma Match */}
          <div className="relative mb-12">
            <div className="relative">
              {/* Main Wheel */}
              <div
                ref={wheelRef}
                className="w-96 h-96 rounded-full relative overflow-hidden shadow-2xl"
                style={{
                  transform: `rotate(${currentRotation}deg)`,
                  transition: "none",
                  border: "12px solid #CE3816", // Red border like Figma
                }}
              >
                {/* Wheel Segments */}
                {WHEEL_SEGMENTS.map((segment, index) => {
                  const segmentAngle = 360 / WHEEL_SEGMENTS.length;
                  const startAngle = segmentAngle * index - 90; // Start from top
                  const endAngle = startAngle + segmentAngle;

                  // Calculate the path for each segment
                  const startAngleRad = (startAngle * Math.PI) / 180;
                  const endAngleRad = (endAngle * Math.PI) / 180;
                  const radius = 192; // Half of 384px (w-96)
                  const centerX = radius;
                  const centerY = radius;

                  const x1 = centerX + radius * Math.cos(startAngleRad);
                  const y1 = centerY + radius * Math.sin(startAngleRad);
                  const x2 = centerX + radius * Math.cos(endAngleRad);
                  const y2 = centerY + radius * Math.sin(endAngleRad);

                  const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                  const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    "Z",
                  ].join(" ");

                  return (
                    <div key={segment.name} className="absolute inset-0">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 384 384"
                        style={{ transform: "rotate(0deg)" }}
                      >
                        <path d={pathData} fill={segment.color} stroke="none" />
                      </svg>
                      {/* Text positioning */}
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          transform: `rotate(${
                            startAngle + segmentAngle / 2 + 90
                          }deg)`,
                          transformOrigin: "center center",
                        }}
                      >
                        <span
                          className="text-sm font-bold tracking-wide"
                          style={{
                            color: segment.textColor,
                            transform: "translateY(-80px) rotate(-90deg)",
                            transformOrigin: "center center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {segment.name}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Center White Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg z-20  " />

                {/* White dots around the wheel - Exact Figma positioning */}
                {Array.from({ length: 16 }).map((_, index) => {
                  const angle = (360 / 16) * index;
                  const radian = (angle * Math.PI) / 180;
                  const radius = 180; // Closer to edge
                  return (
                    <div
                      key={index}
                      className="absolute w-3 h-3 bg-white rounded-full  shadow-sm z-10"
                      style={{
                        top: `${50 + (radius / 192) * 50 * Math.sin(radian)}%`,
                        left: `${50 + (radius / 192) * 50 * Math.cos(radian)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  );
                })}
              </div>

              {/* Pointer Triangle - Exact Figma Match */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-30">
                <div
                  className="w-0 h-0"
                  style={{
                    borderLeft: "26px solid transparent",
                    borderRight: "26px solid transparent",
                    borderBottom: "48px solid #2F911E",
                    filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Instructions Text */}
          <p className="text-lg text-gray-700 mb-8 font-medium">
            Spin Wheel to pick your task
          </p>

          {/* Action Buttons - Exact Figma Match */}
          <div className="flex space-x-6 mb-8">
            <button
              onClick={spinWheel}
              disabled={isSpinning || isLoading || tasks.length === 0}
              className="lg:px-18 px-12 py-4 bg-[#60E5AE] cursor-pointer hover:bg-emerald-500 text-black rounded-md font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>{isSpinning ? "Spinning..." : "Spin"}</span>
              <svg
                className={`w-6 h-6 ${isSpinning ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            <button
              onClick={goToTask}
              disabled={!selectedTask}
              className="lg:px-18 px-12 py-4 bg-[#60E5AE] cursor-pointer hover:bg-emerald-500 text-black rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go To Task
            </button>
          </div>

          {/* Task Count Display */}
          <p className="text-sm text-gray-500 mb-6">
            {tasks.length} tasks available in {selectedCategory}
          </p>

          {/* Selected Task Display */}
          {selectedTask && (
            <div className="mt-6 p-8 bg-white rounded-2xl shadow-xl max-w-lg w-full border border-gray-100">
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Selected Task
                </h3>
                <h4 className="text-lg font-semibold text-emerald-600 mb-4">
                  {selectedTask.title}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedTask.description}
                </p>
                <div className="flex justify-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                    {selectedTask.points} Points
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium">
                    {selectedTask.category}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-xl max-w-md w-full">
              <div className="text-center">
                <div className="text-2xl mb-2">❌</div>
                <p className="text-red-800 font-medium">
                  Failed to load tasks. Please try again.
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 flex flex-col items-center space-y-3 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              <span className="font-medium">Loading tasks...</span>
            </div>
          )}

          {/* No Tasks Message */}
          {!isLoading && !error && tasks.length === 0 && (
            <div className="mt-6 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl max-w-md w-full">
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <p className="text-yellow-800 font-medium">
                  No pending or in-progress tasks found for{" "}
                  <strong>{selectedCategory}</strong> category.
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Right dropdown  */}
        <div className="flex justify-between items-start mb-12">
          {/* Category Selection Panel - Exact Figma Match */}
          <div className="bg-white rounded-xl p-6 shadow-lg w-80">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Select Task Category
            </h3>

            {/* Dropdown */}
            <div className="relative mb-6">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none font-medium"
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Category Radio Buttons with Figma styling */}
            <div className="space-y-3">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="relative">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryChange(category)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedCategory === category
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-gray-300 bg-white group-hover:border-emerald-300"
                      }`}
                    >
                      {selectedCategory === category && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
