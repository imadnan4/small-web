const ADDRESS_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.zz$/;

export function normalizeAddress(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .split(/[/?#]/)[0];
}

export function isValidAddress(address: string): boolean {
  return ADDRESS_PATTERN.test(address);
}
