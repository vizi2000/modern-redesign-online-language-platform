import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders the badge with the correct text', () => {
    render(<Badge>New</Badge>);
    const badgeElement = screen.getByText(/New/i);
    expect(badgeElement).toBeInTheDocument();
  });
});
