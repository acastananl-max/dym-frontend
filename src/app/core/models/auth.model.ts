export interface LoginRequest { email: string; password: string; }
export interface LoginResponse { token: string; role: string; employeeId: number; fullName: string; employeeCode: string; department: string; }
export interface AuthState { token: string | null; role: string | null; employeeId: number | null; fullName: string | null; employeeCode: string | null; department: string | null; }