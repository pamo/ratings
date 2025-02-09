import type { NextApiRequest, NextApiResponse } from 'next';
import data from '@/data/reviewsData';
import Review from '@/data/Review';

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 2;
const MAX_PAGE_SIZE = 5;

type ReviewsApiResponse = NextApiResponse<Review[] | { error: string }>;

const setPageSize = (input: number | null | undefined) => {
  if (!input) {
    return DEFAULT_PAGE_SIZE;
  }

  if (input > MAX_PAGE_SIZE) {
    return MAX_PAGE_SIZE;
  }

  return input;
};

const parseNumberInput = (input: any) => {
  if (!input) return null;
  const number = parseInt(input);
  if (isNaN(number)) return null;
  return number;
};

const handleGet = (req: NextApiRequest, res: ReviewsApiResponse) => {
  const page = parseNumberInput(req.query.page) || DEFAULT_PAGE_NUMBER;
  const pageSize = setPageSize(parseNumberInput(req.query.pageSize));

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  const dataset = data.filter(
    (r: Review) => r.id > startIndex && r.id <= endIndex,
  );

  if (dataset.length === 0) {
    res.status(404).json({ error: 'No reviews found' });
    return;
  }

  res.status(200).json(dataset);
};

export default function handler(req: NextApiRequest, res: ReviewsApiResponse) {
  switch (req.method) {
    case 'GET':
      handleGet(req, res);
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
      break;
  }
}
