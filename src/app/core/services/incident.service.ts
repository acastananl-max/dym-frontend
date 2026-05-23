import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Incident, IncidentRequest } from "../models/incident.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class IncidentService {
  private url = `${environment.apiUrl}/incidents`;
  constructor(private http: HttpClient) {}
  findAll(): Observable<Incident[]>                       { return this.http.get<Incident[]>(this.url); }
  findPending(): Observable<Incident[]>                   { return this.http.get<Incident[]>(`${this.url}/pending`); }
  getMyIncidents(): Observable<Incident[]>                { return this.http.get<Incident[]>(`${this.url}/me`); }
  create(req: IncidentRequest): Observable<Incident>      { return this.http.post<Incident>(this.url, req); }
  approve(id: number, notes?: string): Observable<Incident> { return this.http.put<Incident>(`${this.url}/${id}/approve`, { notes }); }
  reject(id: number, notes?: string): Observable<Incident>  { return this.http.put<Incident>(`${this.url}/${id}/reject`,  { notes }); }
}