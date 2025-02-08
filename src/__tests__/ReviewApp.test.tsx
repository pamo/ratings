import { render, screen, waitFor } from '@testing-library/react';
import ReviewApp from '../components/ReviewApp';
import '@testing-library/jest-dom';

const mockReviews = [
  { id: 1, author: 'John Doe', rating: 5, review: 'Excellent!' },
  { id: 2, author: 'Jane Smith', rating: 4, review: 'Very good!' },
];

describe('ReviewApp', () => {
  it('fetches and displays reviews', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockReviews));
    render(<ReviewApp />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Excellent!')).toBeInTheDocument();
      expect(screen.getByText('Very good!')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    fetchMock.mockRejectOnce();

    render(<ReviewApp />);

    await waitFor(() => {
      expect(screen.getByText('No reviews available.')).toBeInTheDocument();
    });
  });
});
