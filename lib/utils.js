import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value) => JSON.parse(JSON.stringify(value));
export const convertFileToUrl = (file) => URL.createObjectURL(file);

export function encryptKey(passkey) {
  return btoa(passkey);
}

export function decryptKey(passkey) {
  return atob(passkey);
}

  
export const formatHeader = (slug) => {
  if (!slug) return ''; // Return an empty string if slug is undefined
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};