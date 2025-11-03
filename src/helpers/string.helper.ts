export function isHex(value: string | undefined): boolean {
  return value ? /^[0-9a-fA-F]+$/.test(value) : false;
}

export function getInfoHashHexFromUrl(originalUrl: string): string | null {
  const match = originalUrl.match(/[?&]info_hash=([^&]+)/);
  if (!match) return null;

  const encoded = match[1]; // ex: "%18%07%0A%AF%FDwgP~%FD%B1%FD%FD%12%FDd2y%FD"
  const bytes: number[] = [];

  for (let i = 0; i < encoded.length; ) {
    if (encoded[i] === '%' && i + 2 < encoded.length) {
      bytes.push(parseInt(encoded.slice(i + 1, i + 3), 16));
      i += 3;
    } else {
      bytes.push(encoded.charCodeAt(i));
      i++;
    }
  }

  return Buffer.from(bytes).toString('hex');
}
