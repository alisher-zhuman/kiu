export const withFallback = async <T>(
  fetcher: () => Promise<T>,
  fallback: T,
): Promise<{ data: T; hasError: boolean }> => {
  try {
    return { data: await fetcher(), hasError: false };
  } catch {
    return { data: fallback, hasError: true };
  }
};
