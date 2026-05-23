import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Attendance } from "../models/attendance.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class AttendanceService {
  private url = `${environment.apiUrl}/attendance`;
  constructor(private http: HttpClient) {}
  checkIn(type: string = "WEB"): Observable<Attendance>       { return this.http.post<Attendance>(`${this.url}/check-in`, { type }); }
  checkOut(): Observable<Attendance>                           { return this.http.post<Attendance>(`${this.url}/check-out`, {}); }
  getToday(): Observable<Attendance | null>                    { return this.http.get<Attendance>(`${this.url}/today`); }
  getTodayAll(): Observable<Attendance[]>                      { return this.http.get<Attendance[]>(`${this.url}/today/all`); }
  getMyHistory(): Observable<Attendance[]>                     { return this.http.get<Attendance[]>(`${this.url}/me`); }
  getByEmployee(id: number): Observable<Attendance[]>          { return this.http.get<Attendance[]>(`${this.url}/employee/${id}`); }
  getFeed(): Observable<Attendance[]>                          { return this.http.get<Attendance[]>(`${this.url}/feed`); }
}