export const QUERY_KEYS = {
  adminDocuments: (locale: string, docType: string) => ["admin-documents", locale, docType] as const,
  adminNews: (locale: string) => ["admin-news", locale] as const,
  adminNewsById: (locale: string, id: number) =>
    ["admin-news", locale, id] as const,
  adminNewsFormById: (locale: string, id: number) =>
    ["admin-news-form", locale, id] as const,
  adminProfessorById: (locale: string, id: number) =>
    ["admin-professor", locale, id] as const,
  adminProfessors: (locale: string) => ["admin-professors", locale] as const,
  adminSchedules: (locale: string, level: string, section: string) => ["admin-schedules", locale, level, section] as const,
  adminScheduleFormById: (id: number) => ["admin-schedule-form", id] as const,
} as const;
