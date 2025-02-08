import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StarRating from '../StarRating';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('StarRating', () => {
  const mockOnRatingSelect = vi.fn();
  const getStarButtons = () =>
    screen
      .getAllByRole('button')
      .filter(star => star.getAttribute('data-star-id'));

  beforeEach(() => {
    mockOnRatingSelect.mockClear();
  });

  it('renders StarDisplay when onRatingSelect is not provided', () => {
    render(<StarRating rating={3} />);
    const stars = screen.getAllByRole('img');
    expect(stars).toHaveLength(5);
    expect(stars[0]).toHaveClass('marked');
    expect(stars[1]).toHaveClass('marked');
    expect(stars[2]).toHaveClass('marked');
    expect(stars[3]).not.toHaveClass('marked');
    expect(stars[4]).not.toHaveClass('marked');
  });

  it('renders StarInput when onRatingSelect is provided', () => {
    render(<StarRating rating={0} onRatingSelect={mockOnRatingSelect} />);
    const stars = getStarButtons();
    expect(stars).toHaveLength(5);
  });

  it('selects a star when clicked in StarInput', () => {
    const mockOnRatingSelect = vi.fn();
    render(<StarRating rating={0} onRatingSelect={mockOnRatingSelect} />);
    const stars = getStarButtons();

    fireEvent.click(stars[3]);
    expect(stars[3]).toHaveClass('marked');
  });

  it('displays the submit button when onRatingSelect is provided', () => {
    render(<StarRating rating={0} onRatingSelect={mockOnRatingSelect} />);
    const submitButton = screen.getByRole('button', {
      name: /submit review/i,
    });
    expect(submitButton).toBeInTheDocument();
  });

  it('disables the submit button while saving', async () => {
    mockOnRatingSelect.mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 100)),
    );
    render(<StarRating rating={0} onRatingSelect={mockOnRatingSelect} />);
    const stars = getStarButtons();
    fireEvent.click(stars[3]);

    const submitButton = screen.getByRole('button', {
      name: /submit review/i,
    });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    await waitFor(() => expect(submitButton).not.toBeDisabled());
  });

  it('clears the selected star after saving', async () => {
    mockOnRatingSelect.mockResolvedValueOnce(undefined);
    render(<StarRating rating={0} onRatingSelect={mockOnRatingSelect} />);
    const stars = getStarButtons();
    fireEvent.click(stars[3]);
    expect(stars[3]).toHaveClass('marked');

    const submitButton = screen.getByRole('button', {
      name: /submit review/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => expect(stars[3]).not.toHaveClass('marked'));
  });

  it('displays an error message when saving fails', async () => {
    mockOnRatingSelect.mockRejectedValueOnce(
      new Error('Failed to save rating'),
    );
    render(<StarRating rating={0} onRatingSelect={mockOnRatingSelect} />);
    const stars = getStarButtons();
    fireEvent.click(stars[3]);

    const submitButton = screen.getByRole('button', {
      name: /submit review/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(
        screen.getByText('Failed to save rating. Please try again.'),
      ).toBeInTheDocument(),
    );
  });
});
