import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { ZodSchema } from "zod";

/**
 * Higher-order handler to validate request body with Zod before executing.
 *
 * @param handler Original Next.js API handler
 * @param schema  Zod schema used to validate `req.body`
 */
export function withValidation<T>(
  handler: NextApiHandler,
  schema: ZodSchema<T>,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (["POST", "PUT", "PATCH"].includes(req.method ?? "")) {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: "Datos inválidos", issues: result.error.flatten() });
      }
      // override body with validated data
      (req as unknown as { body: T }).body = result.data;
    }

    return handler(req, res);
  };
}
