import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({ selector:"app-schedules", standalone:true, imports:[CommonModule,MatIconModule], templateUrl:"./schedules.component.html" })
export class SchedulesComponent {
  areas = ["Ensamble A","Ensamble B","Ensamble C","Producción A","Producción B","Logística","Control Cal."];
  days  = ["Lunes 11","Mar. 12","Miér. 13","Jue. 14","Vier. 15","Sáb. 16","Dom. 17"];
  pattern = [
    ["slot-morning","slot-morning","slot-morning","slot-morning","slot-morning","slot-morning","slot-rest"],
    ["slot-evening","slot-evening","slot-evening","slot-evening","slot-evening","slot-rest","slot-rest"],
    ["slot-morning","slot-morning","slot-morning","slot-morning","slot-morning","slot-rest","slot-rest"],
    ["slot-night","slot-night","slot-night","slot-night","slot-night","slot-rest","slot-rest"],
    ["slot-evening","slot-evening","slot-evening","slot-evening","slot-morning","slot-rest","slot-rest"],
    ["slot-morning","slot-morning","slot-evening","slot-evening","slot-morning","slot-rest","slot-rest"],
    ["slot-morning","slot-morning","slot-morning","slot-morning","slot-morning","slot-rest","slot-rest"],
  ];
  emoji(cls:string):string{return cls.includes("morning")?"☀":cls.includes("evening")?"🌤":cls.includes("night")?"🌙":"—";}
  constructor(private snack:MatSnackBar){}
  click(area:string,day:string):void{this.snack.open(area+" · "+day+" — Editor próximamente","✕",{duration:2500});}
}