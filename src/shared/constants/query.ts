export const QUERY_KEYS = {
  adminNews: (locale: string) => ["admin-news", locale] as const,
  adminNewsById: (locale: string, id: number) =>
    ["admin-news", locale, id] as const,
} as const;
