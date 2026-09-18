import { fireEvent, render, screen } from '@testing-library/react';
import CalendarView from './components/CalendarView';

test('allows adding and deleting a post from the calendar', () => {
  render(<CalendarView />);

  fireEvent.change(screen.getByLabelText(/post title/i), {
    target: { value: 'New Reel Campaign' },
  });
  fireEvent.change(screen.getByLabelText(/scheduled date/i), {
    target: { value: '2026-08-20' },
  });
  fireEvent.click(screen.getByRole('button', { name: /schedule post/i }));

  expect(screen.getAllByText('New Reel Campaign').length).toBeGreaterThan(0);

  fireEvent.click(screen.getByRole('button', { name: /delete new reel campaign/i }));

  expect(screen.queryAllByText('New Reel Campaign')).toHaveLength(0);
});
