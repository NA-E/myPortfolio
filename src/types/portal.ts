export interface AuditQuestion {
  id: string;
  text: string;
  /** Optional group heading; consecutive questions sharing a section render under one header. */
  section?: string;
}

export interface PortalDoc {
  label: string;
  note?: string;
  /** Link to the doc. Null/empty renders as a "coming soon" placeholder card. */
  url?: string | null;
}

export interface PortalCall {
  name: string;
  date?: string;
  summary?: string;
  recordingUrl?: string | null;
}

export interface PortalSubmission {
  id?: string;
  label?: string;
  url: string;
  createdAt?: string;
}

export interface Portal {
  token: string;
  clientName: string;
  company?: string | null;
  nextStep?: string | null;
  /** Markdown intro shown above the audit questions (the preface). */
  auditIntro?: string | null;
  audit: AuditQuestion[];
  docs: PortalDoc[];
  calls: PortalCall[];
  /** questionId -> checked. Hydrated from the backend (or localStorage fallback). */
  checks?: Record<string, boolean>;
  submissions?: PortalSubmission[];
}
