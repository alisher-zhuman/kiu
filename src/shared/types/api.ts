export interface ApiErrorLike {
  message?: string;
  response?: {
    status?: number;
    data?: {
      message?: string | string[];
      error?: string;
    };
  };
}
