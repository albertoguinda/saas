import { render, screen } from '@testing-library/react';
import AppNavbar from '@/components/navbar';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock('@heroui/ripple', () => ({
  __esModule: true,
  Ripple: ({ children }: any) => <>{children}</>,
  useRipple: () => ({ onPress: jest.fn(), onClear: jest.fn(), ripples: [] }),
}));

jest.mock('next/router', () => ({ useRouter: () => ({ push: jest.fn() }) }));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: () => ({ data: { user: { name: 'Test', email: 'test@x.com', plan: 'pro' } } }),
}));

describe('Navbar accessibility', () => {
  test('avatar button has aria-label', () => {
    render(<AppNavbar />);
    const button = screen.getByRole('button', { name: /menú de usuario/i });
    expect(button).toBeInTheDocument();
  });
});
