export interface BulkCreateResult {
  successful: Array<{
    shortId: string;
    originalUrl: string;
  }>;
  failed: Array<{
    originalUrl: string;
    error: string;
  }>;
  existing: Array<{
    originalUrl: string;
    shortId: string;
  }>;
}
