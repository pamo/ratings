import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  it('loads more reviews', async () => {
    const mockMoreReviews = [
      { id: 3, author: 'Alice Johnson', rating: 3, review: 'Good' },
      { id: 4, author: 'Bob Brown', rating: 2, review: 'Okay' },
    ];
    fetchMock.mockResponses(
      [JSON.stringify(mockReviews), { status: 200 }],
      [JSON.stringify(mockMoreReviews), { status: 200 }],
    );
    render(<ReviewApp />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Load More'));

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Brown')).toBeInTheDocument();
    });
  });

  it('adds a new review with fade-in animation', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockReviews));
    render(<ReviewApp />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    const newAuthor = 'Batman';
    const newReview = {
      id: 3,
      author: newAuthor,
      rating: 3,
      review: 'Good stuff',
    };
    const submitButton = screen.getByTestId('submit-review-btn');

    fetchMock.mockResponseOnce(JSON.stringify(newReview));
    fireEvent.click(screen.getAllByTestId('star-3')[0]);
    fireEvent.click(submitButton);

    await waitFor(() => {
      const newReviewElement = screen.getByText(newAuthor);
      expect(newReviewElement).toBeInTheDocument();
      expect(newReviewElement.closest('div')).toHaveClass('animate-fade-in');
    });
  });
});
