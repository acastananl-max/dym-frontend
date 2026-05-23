import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AuthService } from "../../core/services/auth.service";
import { IncidentService } from "../../core/services/incident.service";

@Component({
  selector: "app-admin-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatBadgeModule, MatTooltipModule],
  templateUrl: "./admin-layout.component.html",
})
export class AdminLayoutComponent implements OnInit {
  fullName = "";
  today = new Date().toLocaleDateString("es-GT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  pendingCount = 0;

  navItems = [
    { label: "Dashboard",        icon: "dashboard",            route: "/admin/dashboard" },
    { label: "Empleados",        icon: "people",               route: "/admin/employees" },
    { label: "Horarios",         icon: "calendar_month",       route: "/admin/schedules" },
    { label: "Incidencias",      icon: "warning_amber",        route: "/admin/incidents",  badge: true },
    { label: "Reportes",         icon: "assessment",           route: "/admin/reports" },
    { label: "Configuración",    icon: "settings",             route: "/admin/settings" },
  ];

  constructor(private auth: AuthService, private incService: IncidentService, public router: Router) {}

  ngOnInit(): void {
    this.fullName = this.auth.getFullName() || "Admin";
    this.incService.findPending().subscribe(list => this.pendingCount = list.length);
  }

  logout(): void { this.auth.logout(); }
}