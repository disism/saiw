
export const random = (length: number): string => {
  let r: string = '';
  const possibleChars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i: number = 0; i < length; i++) {
    r += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return r;
}

export const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  const base64 = arrayBufferToBase64(hash);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export const arrayBufferToBase64 =  (buffer: ArrayBuffer): string =>{
  const arr = new Uint8Array(buffer);
  const str = String.fromCharCode.apply(null, arr as any);
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
