const API_URL = "https://diligenciasley-backend.onrender.com";

export interface User {
  id: number;
  username: string;
  email: string;
  active: boolean;
}

export interface ApiResponse<T = any> {
  ok?: boolean;
  error?: string;
  data?: T;
}

export interface Tasks {
  id: number;
  description?: string | null;
  user: {
    id: number;
    username: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
  state: {
    id: number;
    name: string;
    description?: string | null;
  };
}

const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Error de conexión' }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return await response.json();
};

// id are inferred from request params attached in the auth middleware
export const userService = {
  getProfile: async (): Promise<User> => {
    return apiCall('/users/perfil');
  },

  getTasksByUser: async (): Promise<Tasks[]> => {
    return apiCall(`/tasks`);
  }
};

export const authService = {
  register: async (username: string, email: string, password: string): Promise<ApiResponse> => {
    return apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  login: async (username: string, password: string): Promise<ApiResponse> => {
    return apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  logout: async (): Promise<ApiResponse> => {
    return apiCall('/users/logout', {
      method: 'POST',
    });
  },

  verify: async (code: string): Promise<ApiResponse> => {
    return apiCall('/users/verify', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }
};