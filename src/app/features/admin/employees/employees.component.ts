import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { EmployeeService } from "../../../core/services/employee.service";
import { Employee, EmployeeRequest } from "../../../core/models/employee.model";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: "./employees.component.html",
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filtered: Employee[] = [];
  search = "";
  loading = true;
  showModal = false;
  editing: Employee | null = null;
  form: FormGroup;

  departments = ["Ensamble A","Ensamble B","Ensamble C","Producción A","Producción B","Logística","Control Cal."];
  shifts = ["Mañana (06:00–14:00)","Tarde (14:00–22:00)","Noche (22:00–06:00)"];

  constructor(private svc: EmployeeService, private fb: FormBuilder, private snack: MatSnackBar) {
    this.form = fb.group({
      firstName:  ["", Validators.required],
      lastName:   ["", Validators.required],
      email:      ["", [Validators.required, Validators.email]],
      password:   [""],
      phone:      [""],
      department: ["", Validators.required],
      shift:      ["", Validators.required],
      role:       ["EMPLOYEE"],
    });
  }

  ngOnInit(): void { this.load(); }
  load(): void { this.svc.findAll().subscribe(e => { this.employees = e; this.applyFilter(); this.loading = false; }); }
  applyFilter(): void { const q = this.search.toLowerCase(); this.filtered = this.employees.filter(e => e.fullName.toLowerCase().includes(q) || e.employeeCode.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)); }

  openAdd(): void {
    this.editing = null;
    this.form.reset({ role: "EMPLOYEE" });
    this.form.get("password")?.setValidators(Validators.required);
    this.form.get("password")?.updateValueAndValidity();
    this.showModal = true;
  }

  openEdit(emp: Employee): void {
    this.editing = emp;
    this.form.get("password")?.clearValidators();
    this.form.get("password")?.updateValueAndValidity();
    this.form.patchValue({ firstName: emp.firstName, lastName: emp.lastName, email: emp.email, phone: emp.phone, department: emp.department, shift: emp.shift.split(" ")[0], role: emp.role });
    this.showModal = true;
  }

  save(): void {
    if (this.form.invalid) return;
    const req: EmployeeRequest = this.form.value;
    const op = this.editing ? this.svc.update(this.editing.id, req) : this.svc.create(req);
    op.subscribe({ next: () => { this.showModal = false; this.load(); this.snack.open(this.editing ? "Empleado actualizado" : "Empleado creado", "✓", { duration: 3000, panelClass: "snack-success" }); }, error: e => this.snack.open(e.error?.message || "Error al guardar", "✕", { duration: 4000, panelClass: "snack-error" }) });
  }

  toggle(emp: Employee): void {
    this.svc.toggle(emp.id).subscribe(() => { emp.active = !emp.active; this.snack.open(emp.active ? "Empleado activado" : "Empleado desactivado", "✓", { duration: 2000, panelClass: "snack-success" }); });
  }

  badgeClass(status: string): string { return "badge badge-" + status.toLowerCase(); }
}