import { randomBytes } from 'crypto';

// Generates a prefixed API key: wl_<64 hex chars>
export function generateApiKey(): string {
  return 'wl_' + randomBytes(32).toString('hex');
}
