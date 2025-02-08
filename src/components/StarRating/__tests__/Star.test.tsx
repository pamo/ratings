import { render, screen, fireEvent } from '@testing-library/react';
import Star from '../Star';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Star', () => {
  const mockOnMouseEnter = vi.fn();
  const mockOnMouseLeave = vi.fn();
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnMouseEnter.mockClear();
    mockOnMouseLeave.mockClear();
    mockOnClick.mockClear();
  });

  it('renders a marked star', () => {
    render(<Star position={1} marked={true} />);
    const star = screen.getByRole('img');
    expect(star).toHaveTextContent('\u2605');
    expect(star).toHaveClass('marked');
  });

  it('renders an unmarked star', () => {
    render(<Star position={1} marked={false} />);
    const star = screen.getByRole('img');
    expect(star).toHaveTextContent('\u2606');
    expect(star).not.toHaveClass('marked');
  });

  it('renders a cursor', () => {
    render(
      <Star position={1} marked={false} onMouseEnter={mockOnMouseEnter} />,
    );
    const star = screen.getByRole('button');
    expect(star).toHaveClass('cursor-pointer');
  });

  it('calls onMouseEnter when hovered', () => {
    render(
      <Star position={1} marked={false} onMouseEnter={mockOnMouseEnter} />,
    );
    const star = screen.getByRole('button');
    fireEvent.mouseEnter(star);
    expect(mockOnMouseEnter).toHaveBeenCalled();
  });

  it('calls onMouseLeave when mouse leaves', () => {
    render(
      <Star position={1} marked={false} onMouseLeave={mockOnMouseLeave} />,
    );
    const star = screen.getByRole('button');
    fireEvent.mouseLeave(star);
    expect(mockOnMouseLeave).toHaveBeenCalled();
  });

  it('calls onClick when clicked', () => {
    render(<Star position={1} marked={false} onClick={mockOnClick} />);
    const star = screen.getByRole('button');
    fireEvent.click(star);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
