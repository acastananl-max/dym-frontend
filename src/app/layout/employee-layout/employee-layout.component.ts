import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: "app-employee-layout",
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatTooltipModule],
  templateUrl: "./employee-layout.component.html",
})
export class EmployeeLayoutComponent implements OnInit {
  fullName = "";
  department = "";
  today = new Date().toLocaleDateString("es-GT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getState().subscribe(s => { this.fullName = s.fullName || ""; this.department = s.department || ""; });
  }
  logout(): void { this.auth.logout(); }
}