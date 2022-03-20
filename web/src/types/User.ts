export interface User {
  id: number;
  user: {
    id: number;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}
