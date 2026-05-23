import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({ selector:"app-reports", standalone:true, imports:[CommonModule,MatIconModule], templateUrl:"./reports.component.html" })
export class ReportsComponent {
  reports = [
    { icon:"event_available", label:"Asistencia General", desc:"Reporte completo de asistencia por período", bg:"#e8f5e9", color:"#2e7d32" },
    { icon:"payments",        label:"Exportación Nómina", desc:"Horas trabajadas y extra por empleado",       bg:"#e3f2fd", color:"#1565c0" },
    { icon:"warning",         label:"Incidencias",        desc:"Faltas, tardanzas y permisos por área",       bg:"#fff3e0", color:"#e65100" },
    { icon:"schedule",        label:"Tardanzas",          desc:"Análisis detallado de impuntualidad",         bg:"#fce4ec", color:"#880e4f" },
    { icon:"bar_chart",       label:"Productividad",      desc:"Comparativo por departamento",                bg:"#e8eaf6", color:"#3949ab" },
    { icon:"more_time",       label:"Horas Extra",        desc:"Control de tiempo extra acumulado",           bg:"#e0f2f1", color:"#00695c" },
  ];
  constructor(private snack:MatSnackBar){}
  export(name:string,fmt:string):void{
    this.snack.open("Generando "+name+" en "+fmt+"...","",{duration:1500,panelClass:"snack-success"});
    setTimeout(()=>this.snack.open(fmt+" listo ↓","✓",{duration:3000,panelClass:"snack-success"}),1800);
  }
}