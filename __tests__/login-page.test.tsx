import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/auth/login';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

jest.mock('@heroui/ripple', () => ({
  __esModule: true,
  Ripple: ({ children }: any) => <>{children}</>,
  useRipple: () => ({ onPress: jest.fn(), onClear: jest.fn(), ripples: [] }),
}));

const push = jest.fn();
jest.mock('next/router', () => ({ useRouter: () => ({ push }) }));

describe('LoginPage a11y', () => {
  test('inputs and button have accessible names', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toHaveAccessibleName('Entrar');
  });
});
