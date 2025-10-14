const API_URL = (import.meta.env.MODE === "development" 
    ? "http://localhost:3000" 
    : "https://diligenciasley-backend.onrender.com");
console.log("API_URL:", API_URL);
console.log("Environment Mode:", import.meta.env.MODE);
// Log en desarrollo para verificar la URL
if (import.meta.env.MODE === "development") {
  console.log("🌐 API URL:", API_URL);
}

export interface User {
  id: number;
  username: string;
  email: string;
  active: boolean;
  role?: {
    id: number;
    name: string;
    description?: string;
  };
}

export interface ApiResponse<T = any> {
  ok?: boolean;
  error?: string;
  data?: T;
  success?: boolean;
  message?: string;
  valid?: boolean;
  email?: string;
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
    
    // Manejo específico para rate limit
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      const waitTime = retryAfter ? ` Intenta nuevamente en ${retryAfter} segundos.` : '';
      throw new Error(`Has enviado demasiadas consultas. Por favor, espera un momento antes de intentar nuevamente.${waitTime}`);
    }
    
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
  },

  // 🆕 Métodos para reset de contraseña
  requestPasswordReset: async (email: string): Promise<ApiResponse> => {
    return apiCall('/users/request-password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  validateResetCode: async (code: string): Promise<ApiResponse<{ valid: boolean; email?: string }>> => {
    return apiCall(`/users/validate-reset-code/${code}`);
  },

  resetPassword: async (code: string, newPassword: string): Promise<ApiResponse> => {
    return apiCall('/users/reset-password', {
      method: 'POST',
      body: JSON.stringify({ code, newPassword }),
    });
  }
};

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  sendEmail: async (formData: ContactFormData): Promise<ApiResponse> => {
    return apiCall('/send-email', {
      method: 'POST',
      body: JSON.stringify({
        from: formData.email,
        subject: `Nueva consulta de ${formData.name} - DiligenciasLey`,
        text: formData.message
      }),
    });
  }
};