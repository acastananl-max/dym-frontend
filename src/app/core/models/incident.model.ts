export type IncidentType = "PERMISSION" | "VACATION" | "MEDICAL" | "ABSENCE" | "LATE";
export type IncidentStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface Incident { id: number; employeeId: number; employeeName: string; employeeCode: string; department: string; type: IncidentType; startDate: string; endDate: string | null; reason: string; status: IncidentStatus; reviewerNotes: string | null; reviewedAt: string | null; createdAt: string; }
export interface IncidentRequest { type: IncidentType; startDate: string; endDate?: string; reason: string; }