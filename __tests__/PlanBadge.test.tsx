import { jest } from "@jest/globals";
import { render, screen } from '@testing-library/react';
import PlanBadge from '@/components/PlanBadge';

jest.mock('@heroui/badge', () => ({
  __esModule: true,
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe('PlanBadge', () => {
  it('renders with default free plan', () => {
    render(<PlanBadge />);
    expect(screen.getByText('free')).toBeInTheDocument();
  });
});
