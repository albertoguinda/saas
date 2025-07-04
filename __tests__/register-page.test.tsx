import { render, screen } from '@testing-library/react';
import RegisterPage from '@/app/register/page';

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

describe('RegisterPage', () => {
  const originalFetch = global.fetch;
  beforeEach(() => {
    (global.fetch as any) = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
  });
  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test('renders placeholder text', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Register page placeholder')).toBeInTheDocument();
  });
});
