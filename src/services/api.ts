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

export const authService = {
  register: async (username: string, email: string, password: string): Promise<ApiResponse> => {
    return apiCall('/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  login: async (username: string, password: string): Promise<ApiResponse> => {
    return apiCall('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  logout: async (): Promise<ApiResponse> => {
    return apiCall('/logout', {
      method: 'POST',
    });
  },

  getProfile: async (): Promise<User> => {
    return apiCall('/perfil');
  },

  verify: async (code: string): Promise<ApiResponse> => {
    return apiCall('/verify', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },
};