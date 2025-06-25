export interface LoginResponse {
  UserId: string;
  sessionId: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginState {
  sessionId: string | null;
  UserId: string | null;
}
