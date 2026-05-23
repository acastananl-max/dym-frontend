import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { AttendanceService } from "../../../core/services/attendance.service";
import { Attendance } from "../../../core/models/attendance.model";
@Component({ selector:"app-emp-history", standalone:true, imports:[CommonModule,MatIconModule], templateUrl:"./emp-history.component.html" })
export class EmpHistoryComponent implements OnInit {
  history: Attendance[] = [];
  loading = true;
  constructor(private svc: AttendanceService){}
  ngOnInit():void{ this.svc.getMyHistory().subscribe(h=>{ this.history=h; this.loading=false; }); }
  formatDate(dt:string):string{return dt?new Date(dt).toLocaleDateString("es-GT",{weekday:"long",day:"numeric",month:"short"}):"—";}
  formatTime(dt:string):string{return dt?new Date(dt).toLocaleTimeString("es-GT",{hour:"2-digit",minute:"2-digit"}):"—";}
  workedStr(mins:number|null):string{if(!mins)return "En curso";const h=Math.floor(mins/60);const m=mins%60;return h+"h "+m+"m";}
  badgeClass(s:string):string{return "badge badge-"+s.toLowerCase();}
  statusLabel(s:string):string{const m:Record<string,string>={PRESENT:"Presente",LATE:"Tardanza",ABSENT:"Ausente",PARTIAL:"Parcial"};return m[s]||s;}
}