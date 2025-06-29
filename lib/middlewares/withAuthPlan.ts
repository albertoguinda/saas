import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export function withAuthPlan(handler: NextApiHandler, requiredPlan: 'FREE'|'PRO'|'PREMIUM') {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user) return res.status(401).json({ error: 'No autenticado' });
    const plan = (session.user as any).plan || 'FREE';
    const plansOrder = { FREE: 0, PRO: 1, PREMIUM: 2 };
    if (plansOrder[plan] < plansOrder[requiredPlan]) {
      return res.status(403).json({ error: `Plan ${requiredPlan} requerido` });
    }
    return handler(req, res);
  };
}
