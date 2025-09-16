// import { decryptData } from './index';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; 

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// export const decryptData = (encryptedData: string): string => {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    // Attempt to convert to UTF-8, catching potential errors
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  } catch (e) {
    console.error("Decryption or UTF-8 conversion failed:", e);
    // Handle the error, e.g., return null or an empty string
    return "null";
  }
}