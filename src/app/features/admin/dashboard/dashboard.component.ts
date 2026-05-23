import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { DashboardService } from "../../../core/services/dashboard.service";
import { AttendanceService } from "../../../core/services/attendance.service";
import { DashboardSummary } from "../../../core/models/dashboard.model";
import { Attendance } from "../../../core/models/attendance.model";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit, OnDestroy {
  summary: DashboardSummary | null = null;
  feed: Attendance[] = [];
  loading = true;
  private feedInterval: any;
  private charts: Chart[] = [];

  heatmap = {
    areas: ["Producción A","Producción B","Ensamble A","Ensamble B","Control Cal.","Logística"],
    days:  ["L","M","X","J","V","S","D"],
    values: [
      ["hm-100","hm-90","hm-100","hm-80","hm-90","hm-50","hm-rest"],
      ["hm-90","hm-100","hm-80","hm-100","hm-70","hm-50","hm-rest"],
      ["hm-100","hm-90","hm-100","hm-90","hm-100","hm-rest","hm-rest"],
      ["hm-80","hm-70","hm-90","hm-80","hm-90","hm-50","hm-rest"],
      ["hm-100","hm-90","hm-80","hm-100","hm-90","hm-rest","hm-rest"],
      ["hm-70","hm-80","hm-90","hm-70","hm-80","hm-60","hm-rest"],
    ],
    labels: {"hm-100":"100%","hm-90":"90%","hm-80":"80%","hm-70":"70%","hm-60":"60%","hm-50":"50%","hm-rest":"—"} as Record<string,string>
  };

  risks = [
    { name:"Carlos Pérez",  dept:"Producción A", score:82, level:"high" },
    { name:"Laura Méndez",  dept:"Ensamble B",   score:74, level:"high" },
    { name:"José Ramírez",  dept:"Logística",    score:55, level:"mid"  },
    { name:"Roberto S.",    dept:"Producción B",  score:48, level:"mid"  },
    { name:"Ana Gutiérrez", dept:"Ensamble A",   score:12, level:"low"  },
  ];

  constructor(private dashService: DashboardService, private attService: AttendanceService) {}

  ngOnInit(): void {
    this.load();
    this.feedInterval = setInterval(() => this.loadFeed(), 10000);
  }

  load(): void {
    this.dashService.getSummary().subscribe(s => {
      this.summary = s;
      this.feed = s.recentFeed;
      this.loading = false;
      setTimeout(() => this.initCharts(), 100);
    });
  }

  loadFeed(): void {
    this.attService.getFeed().subscribe(f => this.feed = f);
  }

  initCharts(): void {
    this.charts.forEach(c => c.destroy());
    this.charts = [];
    const donut = document.getElementById("chart-donut") as HTMLCanvasElement;
    const bar   = document.getElementById("chart-bar")   as HTMLCanvasElement;
    if (donut && this.summary) {
      this.charts.push(new Chart(donut, {
        type: "doughnut",
        data: { datasets: [{ data:[this.summary.presentToday, this.summary.absentToday, this.summary.lateToday], backgroundColor:["#4caf50","#e53935","#ffa726"], borderWidth:0, hoverOffset:6 }] },
        options: { cutout:"72%", plugins:{ legend:{display:false} }, animation:{duration:700} }
      }));
    }
    if (bar) {
      this.charts.push(new Chart(bar, {
        type: "bar",
        data: { labels:["Sem 1","Sem 2","Sem 3","Sem 4"], datasets:[
          { label:"Presentes", data:[305,318,308,312], backgroundColor:"#4caf50", borderRadius:4 },
          { label:"Ausentes",  data:[25,12,22,18],    backgroundColor:"#ef9a9a", borderRadius:4 },
          { label:"Tardanzas", data:[18,14,20,23],    backgroundColor:"#ffd54f", borderRadius:4 },
        ]},
        options:{ responsive:true, plugins:{legend:{position:"bottom",labels:{font:{size:11},boxWidth:10}}}, scales:{x:{grid:{display:false},ticks:{font:{size:11}}},y:{grid:{color:"#f1f5f9"},ticks:{font:{size:11}}}} }
      }));
    }
  }

  getHmLabel(cls: string): string { return this.heatmap.labels[cls] || ""; }
  getRiskColor(level: string): string { return level==="high"?"#e53935":level==="mid"?"#ffa726":"#4caf50"; }
  getAttColor(status: string): string { return status==="LATE"?"#fef3c7":status==="PRESENT"?"#dcfce7":"#f1f5f9"; }
  getAttText(status: string): string  { return status==="LATE"?"Tardanza":status==="PRESENT"?"Entrada":"Salida"; }
  getAttTextColor(status: string): string { return status==="LATE"?"#92400e":status==="PRESENT"?"#166534":"#64748b"; }
  formatTime(dt: string): string { return dt ? new Date(dt).toLocaleTimeString("es-GT",{hour:"2-digit",minute:"2-digit"}) : "—"; }
  timeAgo(dt: string): string {
    if (!dt) return "";
    const diff = Math.floor((Date.now() - new Date(dt).getTime()) / 60000);
    return diff < 1 ? "ahora" : diff < 60 ? `hace ${diff} min` : `hace ${Math.floor(diff/60)}h`;
  }
  initials(name: string): string { return name.split(" ").map(n=>n[0]).join("").substring(0,2).toUpperCase(); }

  ngOnDestroy(): void {
    clearInterval(this.feedInterval);
    this.charts.forEach(c => c.destroy());
  }
}