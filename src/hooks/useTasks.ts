// hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/taskService";
import {
  TaskFilters,
  UpdateTaskPayload,
  CreateTaskPayload,
} from "@/types/task";
import { toast } from "sonner";

// Add this new hook
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData: CreateTaskPayload) =>
      taskService.createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create task");
      console.error("Create task error:", error);
    },
  });
};

// Your existing hooks
export const useTasks = (filters: TaskFilters = {}) => {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => taskService.getTasks(filters),
    staleTime: 5 * 60 * 1000,
  });
};
export const useSpinWheelTasks = (category?: string) => {
  return useQuery({
    queryKey: ["spin-wheel-tasks", category],
    queryFn: () => taskService.getSpinWheelTasks(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!category, // Only fetch when category is provided
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
  });
};

export const useTasksByCategory = (category: string) => {
  return useQuery({
    queryKey: ["tasks", "category", category],
    queryFn: () => taskService.getTaskByCategory(category),
    enabled: !!category,
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      taskService.updateTask(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
      toast.success("Task updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update task");
      console.error("Update task error:", error);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete task");
      console.error("Delete task error:", error);
    },
  });
};
