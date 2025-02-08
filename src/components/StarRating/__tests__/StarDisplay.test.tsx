import { render, screen } from '@testing-library/react';
import StarDisplay from '../StarDisplay';
import '@testing-library/jest-dom';

describe('StarDisplay', () => {
  it('renders the correct number of marked stars based on rating', () => {
    render(<StarDisplay rating={3} />);
    const stars = screen.getAllByRole('img');
    expect(stars).toHaveLength(5);
    expect(stars[0]).toHaveClass('marked');
    expect(stars[1]).toHaveClass('marked');
    expect(stars[2]).toHaveClass('marked');
    expect(stars[3]).not.toHaveClass('marked');
    expect(stars[4]).not.toHaveClass('marked');
  });

  it('renders all stars as unmarked when rating is 0', () => {
    render(<StarDisplay rating={0} />);
    const stars = screen.getAllByRole('img');
    expect(stars).toHaveLength(5);
    stars.forEach(star => {
      expect(star).not.toHaveClass('marked');
    });
  });

  it('renders all stars as marked when rating is the max', () => {
    const positions = [1, 2, 3];
    render(<StarDisplay positions={positions} rating={positions.length + 1} />);
    const stars = screen.getAllByRole('img');
    expect(stars).toHaveLength(positions.length);
    stars.forEach(star => {
      expect(star).toHaveClass('marked');
    });
  });

  it('renders the correct number of stars when rating is between 1 and max', () => {
    const rating = 3;
    render(<StarDisplay rating={rating} />);
    const stars = screen.getAllByRole('img');
    expect(stars).toHaveLength(5);
    stars.forEach((star, index) => {
      if (index < rating) {
        expect(star).toHaveClass('marked');
      } else {
        expect(star).not.toHaveClass('marked');
      }
    });
  });
});
