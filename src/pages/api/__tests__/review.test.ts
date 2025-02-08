import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/review';
import { NextApiRequest, NextApiResponse } from 'next';

describe('API Handler - /api/review', () => {
  it('should return a review by ID', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { id: '1' },
    });

    await handler(req, res);
    const body = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('author');
    expect(body).toHaveProperty('rating');
    expect(body).toHaveProperty('review');
  });

  it('should return 400 for invalid review ID', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { id: 'invalid' },
    });

    await handler(req, res);

    const body = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'Invalid review ID');
  });

  it('should return 404 for non-existent review', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { id: '999' },
    });

    await handler(req, res);

    const body = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(body).toHaveProperty('error', 'Review not found');
  });

  it('should add a new review', async () => {
    const newReview = {
      author: 'Test Author',
      rating: 5,
      review: 'Test review',
    };

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: newReview,
    });

    await handler(req, res);

    const body = res._getJSONData();
    expect(res.statusCode).toBe(201);
    expect(body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...newReview,
      }),
    );
  });

  it('should return 400 for invalid input when adding a review', async () => {
    const invalidReview = {
      author: '',
      rating: 'invalid',
      review: 'Test review',
    };

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
      body: invalidReview,
    });

    await handler(req, res);
    const body = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(body).toHaveProperty('error', 'Invalid input');
  });
});
