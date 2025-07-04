import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '@/app/register/page';
import { track } from '@/lib/track';

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
jest.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

jest.mock('@/lib/track', () => ({ track: jest.fn() }));

describe('RegisterPage', () => {
  const originalFetch = global.fetch;
  beforeEach(() => {
    (global.fetch as any) = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
  });
  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test('calls track after successful registration', async () => {
    render(<RegisterPage />);
    fireEvent.change(screen.getByPlaceholderText('Tu nombre'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('alberto@gmail.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrarse gratis/i }));

    await waitFor(() => {
      expect(track).toHaveBeenCalledWith('signup_free');
    });
  });
});
