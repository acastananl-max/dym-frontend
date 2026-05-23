import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
@Component({ selector:"app-emp-schedule", standalone:true, imports:[CommonModule,MatIconModule], templateUrl:"./emp-schedule.component.html" })
export class EmpScheduleComponent {
  days = Array.from({length:31},(_,i)=>{
    const d=i+1;
    const rest=[4,5,11,12,18,19,25,26].includes(d);
    const late=[12].includes(d);
    const today=d===16;
    return { num:d, rest, late, today, label:rest?"—":late?"Tard.":today?"Hoy":"06-14", bg:rest?"#f8fafc":late?"#fffbeb":today?"#e8f5e9":"#f0fdf4", color:rest?"#94a3b8":late?"#d97706":today?"#2e7d32":"#4caf50" };
  });
}