import { toast } from "@heroui/toast";

/**
 * Show a success toast message.
 *
 * @param message - Message to display
 * @example
 * ```ts
 * notifySuccess('Project saved');
 * ```
 */
export function notifySuccess(message: string) {
  if (toast?.success) toast.success(message);
}

/**
 * Show an error toast message.
 *
 * @param message - Message to display
 * @example
 * ```ts
 * notifyError('Failed to save');
 * ```
 */
export function notifyError(message: string) {
  if (toast?.error) toast.error(message);
}
