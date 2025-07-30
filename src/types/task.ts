// types/task.ts
export interface Task {
  _id: string;
  id: string;
  title: string;
  description: string;
  category:
    | "Art and Craft"
    | "Nature"
    | "Family"
    | "Sport"
    | "Friends"
    | "Meditation"
    | "Collaborative Task"
    | "All Task";
  status: "Pending" | "InProgress" | "Done" | "Ongoing";
  points: number;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isOverdue: boolean;
  userId?: string;
}

export interface TasksResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    tasks: Task[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface SingleTaskResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Task;
}

export interface TaskFilters {
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  searchTerm?: string;
}

export interface UpdateTaskPayload {
  status?: Task["status"];
  points?: number;
}

export interface DeleteTaskResponse {
  statusCode: number;
  success: boolean;
  message: string;
}
