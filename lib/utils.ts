import clsx, { type ClassValue } from "clsx";
import bcrypt from "bcryptjs";

/**
 * Merge class names using clsx.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(...inputs);
}

/**
 * Hash a password using bcrypt.
 * @param password Plain text password
 * @param saltRounds Bcrypt salt rounds (default 12)
 */
export function hashPassword(password: string, saltRounds = 12) {
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compare a password with its hashed counterpart.
 */
export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
