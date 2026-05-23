import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee, EmployeeRequest } from "../models/employee.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class EmployeeService {
  private url = `${environment.apiUrl}/employees`;
  constructor(private http: HttpClient) {}
  findAll(): Observable<Employee[]>                    { return this.http.get<Employee[]>(this.url); }
  findById(id: number): Observable<Employee>           { return this.http.get<Employee>(`${this.url}/${id}`); }
  create(req: EmployeeRequest): Observable<Employee>   { return this.http.post<Employee>(this.url, req); }
  update(id: number, req: EmployeeRequest): Observable<Employee> { return this.http.put<Employee>(`${this.url}/${id}`, req); }
  toggle(id: number): Observable<void>                 { return this.http.patch<void>(`${this.url}/${id}/toggle`, {}); }
}