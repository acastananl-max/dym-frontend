import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoginRequest, LoginResponse, AuthState } from "../models/auth.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly KEY = "dym_auth";
  private state$ = new BehaviorSubject<AuthState>(this.loadState());

  constructor(private http: HttpClient, private router: Router) {}

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, req).pipe(
      tap(res => {
        const state: AuthState = { token: res.token, role: res.role, employeeId: res.employeeId, fullName: res.fullName, employeeCode: res.employeeCode, department: res.department };
        localStorage.setItem(this.KEY, JSON.stringify(state));
        this.state$.next(state);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.KEY);
    this.state$.next({ token: null, role: null, employeeId: null, fullName: null, employeeCode: null, department: null });
    this.router.navigate(["/login"]);
  }

  getState(): Observable<AuthState> { return this.state$.asObservable(); }
  getToken(): string | null        { return this.state$.value.token; }
  getRole(): string | null         { return this.state$.value.role; }
  getEmployeeId(): number | null   { return this.state$.value.employeeId; }
  getFullName(): string | null     { return this.state$.value.fullName; }
  isLoggedIn(): boolean            { return !!this.state$.value.token; }
  isAdmin(): boolean               { return this.state$.value.role === "ADMIN"; }

  private loadState(): AuthState {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : { token: null, role: null, employeeId: null, fullName: null, employeeCode: null, department: null };
    } catch { return { token: null, role: null, employeeId: null, fullName: null, employeeCode: null, department: null }; }
  }
}