import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { IncidentService } from "../../../core/services/incident.service";
import { Incident, IncidentType } from "../../../core/models/incident.model";
@Component({ selector:"app-emp-requests", standalone:true, imports:[CommonModule,FormsModule,MatIconModule,MatFormFieldModule,MatInputModule,MatSelectModule], templateUrl:"./emp-requests.component.html" })
export class EmpRequestsComponent implements OnInit {
  incidents: Incident[] = [];
  showModal = false;
  newType:IncidentType = "PERMISSION";
  newStart = "";
  newEnd = "";
  newReason = "";
  typeLabel: Record<string,string> = { PERMISSION:"Permiso personal", VACATION:"Vacaciones", MEDICAL:"Permiso médico", ABSENCE:"Ausencia", LATE:"Tardanza just." };
  constructor(private svc:IncidentService, private snack:MatSnackBar){}
  ngOnInit():void{this.svc.getMyIncidents().subscribe(i=>this.incidents=i);}
  submit():void{
    if(!this.newStart||!this.newReason)return;
    this.svc.create({type:this.newType,startDate:this.newStart,endDate:this.newEnd||undefined,reason:this.newReason}).subscribe({
      next:i=>{this.incidents.unshift(i);this.showModal=false;this.snack.open("Solicitud enviada ✓","",{duration:3000,panelClass:"snack-success"});},
      error:()=>this.snack.open("Error al enviar","✕",{duration:3000,panelClass:"snack-error"})
    });
  }
  formatDate(d:string):string{return d?new Date(d).toLocaleDateString("es-GT"):"—";}
}