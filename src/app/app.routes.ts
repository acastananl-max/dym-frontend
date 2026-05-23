import { Routes } from "@angular/router";
import { authGuard, adminGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: "login", loadComponent: () => import("./features/auth/login/login.component").then(m => m.LoginComponent) },
  {
    path: "admin",
    loadComponent: () => import("./layout/admin-layout/admin-layout.component").then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      { path: "dashboard",  loadComponent: () => import("./features/admin/dashboard/dashboard.component").then(m => m.DashboardComponent) },
      { path: "employees",  loadComponent: () => import("./features/admin/employees/employees.component").then(m => m.EmployeesComponent) },
      { path: "schedules",  loadComponent: () => import("./features/admin/schedules/schedules.component").then(m => m.SchedulesComponent) },
      { path: "incidents",  loadComponent: () => import("./features/admin/incidents/incidents.component").then(m => m.IncidentsComponent) },
      { path: "reports",    loadComponent: () => import("./features/admin/reports/reports.component").then(m => m.ReportsComponent) },
      { path: "settings",   loadComponent: () => import("./features/admin/settings/settings.component").then(m => m.SettingsComponent) },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ]
  },
  {
    path: "employee",
    loadComponent: () => import("./layout/employee-layout/employee-layout.component").then(m => m.EmployeeLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: "dashboard", loadComponent: () => import("./features/employee/dashboard/emp-dashboard.component").then(m => m.EmpDashboardComponent) },
      { path: "schedule",  loadComponent: () => import("./features/employee/schedule/emp-schedule.component").then(m => m.EmpScheduleComponent) },
      { path: "history",   loadComponent: () => import("./features/employee/history/emp-history.component").then(m => m.EmpHistoryComponent) },
      { path: "requests",  loadComponent: () => import("./features/employee/requests/emp-requests.component").then(m => m.EmpRequestsComponent) },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ]
  },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login" }
];