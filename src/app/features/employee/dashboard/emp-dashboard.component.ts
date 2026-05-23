import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AttendanceService } from "../../../core/services/attendance.service";
import { IncidentService } from "../../../core/services/incident.service";
import { Attendance } from "../../../core/models/attendance.model";
import { Incident } from "../../../core/models/incident.model";

@Component({
  selector: "app-emp-dashboard",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./emp-dashboard.component.html",
})
export class EmpDashboardComponent implements OnInit, OnDestroy {
  todayAtt: Attendance | null = null;
  myIncidents: Incident[] = [];
  clockedIn = false;
  seconds = 0;
  private interval: any;

  week = [
    { day:"L",num:"11",status:"ok",hours:"7h 58m"},
    { day:"M",num:"12",status:"late",hours:"7h 45m"},
    { day:"X",num:"13",status:"ok",hours:"8h 02m"},
    { day:"J",num:"14",status:"ok",hours:"8h 00m"},
    { day:"V",num:"15",status:"ok",hours:"8h 10m"},
    { day:"S",num:"16",status:"live",hours:"En curso"},
    { day:"D",num:"17",status:"rest",hours:"Descanso"},
  ];

  typeLabel: Record<string,string> = { PERMISSION:"Permiso personal", VACATION:"Vacaciones", MEDICAL:"Permiso médico", ABSENCE:"Ausencia", LATE:"Tardanza just." };
  typeIcon:  Record<string,string> = { PERMISSION:"person_clock", VACATION:"beach_access", MEDICAL:"local_hospital", ABSENCE:"event_busy", LATE:"schedule" };

  constructor(private attSvc: AttendanceService, private incSvc: IncidentService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.attSvc.getToday().subscribe({
      next: att => {
        this.todayAtt = att;
        if (att && att.checkIn && !att.checkOut) {
          this.clockedIn = true;
          this.seconds = Math.floor((Date.now() - new Date(att.checkIn).getTime()) / 1000);
          this.startClock();
        }
      }, error: () => {}
    });
    this.incSvc.getMyIncidents().subscribe(list => this.myIncidents = list.slice(0, 3));
  }

  checkIn(): void {
    this.attSvc.checkIn("WEB").subscribe({
      next: att => { this.todayAtt = att; this.clockedIn = true; this.seconds = 0; this.startClock(); this.snack.open("✅ Entrada registrada exitosamente","",{duration:3000,panelClass:"snack-success"}); },
      error: e  => this.snack.open(e.error?.message || "Error al registrar entrada","✕",{duration:4000,panelClass:"snack-error"})
    });
  }

  checkOut(): void {
    this.attSvc.checkOut().subscribe({
      next: att => { this.todayAtt = att; this.clockedIn = false; this.stopClock(); this.snack.open("👋 Salida registrada. ¡Hasta mañana!","",{duration:3000,panelClass:"snack-success"}); },
      error: e  => this.snack.open(e.error?.message || "Error al registrar salida","✕",{duration:4000,panelClass:"snack-error"})
    });
  }

  startClock(): void { this.interval = setInterval(() => this.seconds++, 1000); }
  stopClock():  void { clearInterval(this.interval); }
  ngOnDestroy(): void { this.stopClock(); }

  get clockDisplay(): string { const h=Math.floor(this.seconds/3600); const m=Math.floor((this.seconds%3600)/60); const s=this.seconds%60; return `${this.pad(h)}:${this.pad(m)}:${this.pad(s)}`; }
  get ringOffset(): string { const c=2*Math.PI*38; return (c*(1-Math.min(this.seconds/28800,1))).toFixed(2); }
  get remaining(): string { const l=Math.max(0,28800-this.seconds); return `${Math.floor(l/3600)}h ${Math.floor((l%3600)/60)}m`; }
  pad(n:number):string{return String(n).padStart(2,"0");}
  formatDate(d:string):string{return d?new Date(d).toLocaleDateString("es-GT"):"—";}
  formatTime(dt:string):string{return dt?new Date(dt).toLocaleTimeString("es-GT",{hour:"2-digit",minute:"2-digit"}):"—";}
}