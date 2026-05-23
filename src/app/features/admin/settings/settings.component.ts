import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({ selector:"app-settings", standalone:true, imports:[CommonModule,FormsModule,MatIconModule,MatSlideToggleModule], templateUrl:"./settings.component.html" })
export class SettingsComponent {
  rules = [{label:"Tolerancia entrada",value:"10",unit:"min"},{label:"Tolerancia salida",value:"10",unit:"min"},{label:"Mínimo entre marcajes",value:"60",unit:"min"},{label:"Umbral horas extra",value:"8",unit:"horas"},{label:"Tardanza grave",value:"30",unit:"min"}];
  alerts = [{label:"Tardanza inminente",desc:"10 min antes del turno",on:true},{label:"Sin marcaje al inicio",desc:"Aviso 15 min después",on:true},{label:"Segunda ausencia en semana",desc:"Notifica al supervisor",on:true},{label:"Horas extra excesivas",desc:"Supera el límite diario",on:false},{label:"Reporte semanal de riesgo",desc:"Envío automático el viernes",on:true}];
  constructor(private snack:MatSnackBar){}
  save():void{this.snack.open("Configuración guardada","✓",{duration:3000,panelClass:"snack-success"});}
}