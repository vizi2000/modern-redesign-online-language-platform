import React from "react"
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingSystem from './BookingSystem';

describe('BookingSystem', () => {
  it('should allow a user to complete the entire booking process', async () => {
    render(<BookingSystem />);

    // Step 1: Select a service
    fireEvent.click(screen.getByText(/Bezpłatna lekcja próbna/i));

    // Step 2: Select date and time
    await waitFor(() => {
      expect(screen.getByText(/Wybierz termin/i)).toBeInTheDocument();
    });

    // Find the first available date and click it
    const dateButtons = screen.getAllByRole('button', { name: /\d{1,2} \w{3}/i });
    fireEvent.click(dateButtons[0]);

    // Wait for time slots to appear, then select the first one
    await waitFor(() => {
      const timeButtons = screen.getAllByText(/\d{2}:\d{2}/);
      expect(timeButtons[0]).toBeInTheDocument();
      fireEvent.click(timeButtons[0]);
    });

    fireEvent.click(screen.getByText(/Dalej - dane kontaktowe/i));

    // Step 3: Fill out contact details
    await waitFor(() => {
      expect(screen.getByText(/Dane kontaktowe/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/Jan Kowalski/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/jan@email.com/i), { target: { value: 'test@example.com' } });

    fireEvent.click(screen.getByText(/Zarezerwuj lekcję/i));

    // Step 4: Confirmation
    await waitFor(() => {
      expect(screen.getByText(/Rezerwacja potwierdzona!/i)).toBeInTheDocument();
    }, { timeout: 3000 }); // Increase timeout for simulated API call

    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });
});
