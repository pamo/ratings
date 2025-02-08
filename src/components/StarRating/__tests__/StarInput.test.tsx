import { render, screen, fireEvent } from '@testing-library/react';
import StarInput from '../StarInput';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('StarInput', () => {
  const mockOnRatingSelect = vi.fn();

  beforeEach(() => {
    mockOnRatingSelect.mockClear();
  });

  it('renders 5 stars', () => {
    render(
      <StarInput
        onRatingSelect={mockOnRatingSelect}
        positions={[1, 2, 3, 4, 5]}
      />,
    );
    const stars = screen.getAllByRole('button');
    expect(stars).toHaveLength(5);
  });

  it('highlights stars on hover', () => {
    render(
      <StarInput
        onRatingSelect={mockOnRatingSelect}
        positions={[1, 2, 3, 4, 5]}
      />,
    );
    const stars = screen.getAllByRole('button');

    fireEvent.mouseEnter(stars[2]);
    expect(stars[0]).toHaveClass('marked');
    expect(stars[1]).toHaveClass('marked');
    expect(stars[2]).toHaveClass('marked');
    expect(stars[3]).not.toHaveClass('marked');
    expect(stars[4]).not.toHaveClass('marked');
  });

  it('selects a rating on click', () => {
    render(
      <StarInput
        onRatingSelect={mockOnRatingSelect}
        positions={[1, 2, 3, 4, 5]}
      />,
    );
    const stars = screen.getAllByRole('button');

    fireEvent.click(stars[3]);
    expect(mockOnRatingSelect).toHaveBeenCalledWith(4);
    expect(stars[0]).toHaveClass('marked');
    expect(stars[1]).toHaveClass('marked');
    expect(stars[2]).toHaveClass('marked');
    expect(stars[3]).toHaveClass('marked');
    expect(stars[4]).not.toHaveClass('marked');
  });

  it('removes highlight on mouse leave', () => {
    render(
      <StarInput
        onRatingSelect={mockOnRatingSelect}
        positions={[1, 2, 3, 4, 5]}
      />,
    );
    const stars = screen.getAllByRole('button');

    fireEvent.mouseEnter(stars[2]);
    fireEvent.mouseLeave(stars[2]);
    expect(stars[0]).not.toHaveClass('marked');
    expect(stars[1]).not.toHaveClass('marked');
    expect(stars[2]).not.toHaveClass('marked');
    expect(stars[3]).not.toHaveClass('marked');
    expect(stars[4]).not.toHaveClass('marked');
  });
});
