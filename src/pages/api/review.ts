import type { NextApiRequest, NextApiResponse } from 'next';
import Review from '@/data/Review';
import data from '@/data/reviewsData';

let reviews = [...data];

type ReviewApiResponse = NextApiResponse<Review | { error: string }>;

const handleGet = (req: NextApiRequest, res: ReviewApiResponse) => {
  const { id } = req.query;
  const reviewId = Number(id);

  if (isNaN(reviewId)) {
    res.status(400).json({ error: 'Invalid review ID' });
    return;
  }

  const review = reviews.find(r => r.id === reviewId);

  if (!review) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }

  res.status(200).json(review);
};

const handlePost = (req: NextApiRequest, res: ReviewApiResponse) => {
  const { author, rating, review } = req.body;

  if (!author || !rating || isNaN(Number(rating))) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  const newReview: Review = {
    id: reviews.length + 1,
    author,
    rating: Number(rating),
    review,
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
};

export default function handler(req: NextApiRequest, res: ReviewApiResponse) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    case 'POST':
      handlePost(req, res);
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
