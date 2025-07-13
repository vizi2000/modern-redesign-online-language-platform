import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LanguageLevelTest from './LanguageLevelTest';

describe('LanguageLevelTest', () => {
  it('should allow a user to take a language test and see the results', async () => {
    render(<LanguageLevelTest />);

    // Start the English test
    fireEvent.click(screen.getByText(/Angielski/i));

    // Answer all the questions
    for (let i = 0; i < 10; i++) {
      await waitFor(() => {
        expect(screen.getByText(`Pytanie ${i + 1} z 10`)).toBeInTheDocument();
      });

      const options = screen.getAllByRole('button', { name: /^[A-D]\./ });
      fireEvent.click(options[0]); // Select the first option for simplicity

      const nextButton = screen.getByRole('button', { name: /Następne pytanie|Zakończ test/i });
      fireEvent.click(nextButton);
    }

    // Check for the results screen
    await waitFor(() => {
      expect(screen.getByText(/Gratulacje! Test zakończony/i)).toBeInTheDocument();
    });
  });
});
