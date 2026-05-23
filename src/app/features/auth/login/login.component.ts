import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  hidePass = true;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private snack: MatSnackBar) {
    this.form = fb.group({ email: ["admin@dym.com", [Validators.required, Validators.email]], password: ["admin123", Validators.required] });
    if (auth.isLoggedIn()) this.redirect(auth.getRole()!);
  }

  submit(): void {
    if (this.form.invalid || this.loading) return;
    this.loading = true;
    this.auth.login(this.form.value).subscribe({
      next: res => this.redirect(res.role),
      error: err => {
        this.loading = false;
        this.snack.open("Credenciales inválidas. Verifica tu usuario y contraseña.", "✕", { duration: 4000, panelClass: "snack-error" });
      }
    });
  }

  quickLogin(role: "admin" | "employee"): void {
    const creds = role === "admin" ? { email: "admin@dym.com", password: "admin123" } : { email: "ana.g@dym.com", password: "emp123" };
    this.form.patchValue(creds);
    this.submit();
  }

  private redirect(role: string): void {
    this.router.navigate([role === "ADMIN" ? "/admin/dashboard" : "/employee/dashboard"]);
  }
}