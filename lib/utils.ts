import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormmater = new Intl.NumberFormat("en-ZA",{
  style : "currency",
  currency : "ZAR"
})