import React from "react";
import { X, Star } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type: "success" | "danger";
  confirmText: string;
  cancelText: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success illustration */}
        {isSuccess && (
          <div className="text-center mb-6">
            <div className="relative mx-auto w-32 h-24 mb-4">
              {/* Decorative stars */}
              <Star
                className="absolute top-0 left-4 text-green-400 fill-current"
                size={16}
              />
              <Star
                className="absolute top-2 right-6 text-pink-400 fill-current"
                size={12}
              />
              <Star
                className="absolute bottom-4 left-8 text-blue-400 fill-current"
                size={14}
              />
              <Star
                className="absolute bottom-2 right-4 text-purple-400 fill-current"
                size={16}
              />
              <Star
                className="absolute top-6 right-2 text-orange-400 fill-current"
                size={10}
              />

              {/* Congratulations text with decorative elements */}
              <div className="text-center">
                <h2
                  className="text-2xl font-bold text-gray-800 mb-2"
                  style={{ fontFamily: "cursive" }}
                >
                  Congratulations
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* Delete illustration */}
        {!isSuccess && (
          <div className="text-center mb-6">
            <div className="mx-auto w-32 h-24 mb-4 relative">
              {/* Illustration of person with papers */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-20 relative">
                  {/* Person */}
                  <div className="w-8 h-8 bg-purple-400 rounded-full absolute top-0 left-4"></div>
                  <div className="w-12 h-12 bg-purple-500 rounded-t-lg absolute top-6 left-2"></div>

                  {/* Papers flying */}
                  <div className="absolute -top-2 -left-2 w-6 h-8 bg-white border border-gray-300 rounded transform -rotate-12"></div>
                  <div className="absolute -top-1 right-0 w-6 h-8 bg-white border border-gray-300 rounded transform rotate-12"></div>
                  <div className="absolute top-2 -right-4 w-6 h-8 bg-white border border-gray-300 rounded transform rotate-6"></div>
                </div>
              </div>

              {/* Sad folder */}
              <div className="absolute bottom-0 right-4 w-12 h-10 bg-orange-400 rounded-lg">
                <div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full"></div>
                <div className="absolute bottom-2 left-3 w-6 h-1 bg-black rounded-full transform rotate-180"></div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              isSuccess
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 rounded-lg font-medium bg-red-100 text-red-600 hover:bg-red-200"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
