import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IncidentService } from "../../../core/services/incident.service";
import { Incident } from "../../../core/models/incident.model";

@Component({
  selector: "app-incidents",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./incidents.component.html",
})
export class IncidentsComponent implements OnInit {
  incidents: Incident[] = [];
  loading = true;

  typeIcons: Record<string,string> = { PERMISSION:"person_clock", VACATION:"beach_access", MEDICAL:"local_hospital", ABSENCE:"event_busy", LATE:"schedule" };
  typeBg:    Record<string,string> = { PERMISSION:"#fff3e0", VACATION:"#e3f2fd", MEDICAL:"#fee2e2", ABSENCE:"#fce4ec", LATE:"#f3e5f5" };
  typeColor: Record<string,string> = { PERMISSION:"#e65100", VACATION:"#1565c0", MEDICAL:"#c62828", ABSENCE:"#880e4f", LATE:"#6a1b9a" };
  typeLabel: Record<string,string> = { PERMISSION:"Permiso personal", VACATION:"Vacaciones", MEDICAL:"Permiso médico", ABSENCE:"Ausencia", LATE:"Tardanza just." };

  constructor(private svc: IncidentService, private snack: MatSnackBar) {}
  ngOnInit(): void { this.load(); }
  load(): void { this.svc.findPending().subscribe(i => { this.incidents = i; this.loading = false; }); }

  approve(id: number): void {
    this.svc.approve(id).subscribe(() => {
      this.incidents = this.incidents.filter(i => i.id !== id);
      this.snack.open("Solicitud aprobada ✓", "✕", { duration: 3000, panelClass: "snack-success" });
    });
  }

  reject(id: number): void {
    this.svc.reject(id).subscribe(() => {
      this.incidents = this.incidents.filter(i => i.id !== id);
      this.snack.open("Solicitud rechazada", "✕", { duration: 3000, panelClass: "snack-error" });
    });
  }

  formatDate(d: string): string { return d ? new Date(d).toLocaleDateString("es-GT") : "—"; }
}