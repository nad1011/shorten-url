import { Url } from './schemas/url.schema';

export interface BulkCreateResult {
  successful: Array<Partial<Url>>;
  failed: Array<{
    originalUrl: string;
    error: string;
  }>;
  existing: Array<Partial<Url>>;
}

export interface Result {
  data: Partial<Url> | BulkCreateResult | Array<Partial<Url>>;
  error: string | null;
}
