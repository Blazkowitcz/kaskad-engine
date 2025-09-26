import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16);

/**
 * Encrypt string with AES-256 algorithm
 * @param data {String}
 * @return {String}
 */
export function encrypt(data: string): string {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

/**
 * Decrypt string
 * @param encrypted {String}
 * @return {String}
 */
export function decrypt(encrypted: string): string {
  const [ivHex, data] = encrypted.split(':');
  const decipher = createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
