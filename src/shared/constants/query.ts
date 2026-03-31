export const QUERY_KEYS = {
  adminDocuments: (locale: string) => ["admin-documents", locale] as const,
  adminNews: (locale: string) => ["admin-news", locale] as const,
  adminNewsById: (locale: string, id: number) =>
    ["admin-news", locale, id] as const,
  adminProfessors: (locale: string) => ["admin-professors", locale] as const,
} as const;
