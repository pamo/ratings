import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/reviews';
import { NextApiRequest, NextApiResponse } from 'next';

describe('API Handler - /api/reviews', () => {
  it('should return paginated reviews', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { page: '1', pageSize: '2' },
    });

    await handler(req, res);
    const body = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(body).toHaveLength(2);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('author');
    expect(body[0]).toHaveProperty('rating');
    expect(body[0]).toHaveProperty('review');
  });

  it('should return 404 for non-existent page', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'GET',
      query: { page: '999', pageSize: '2' },
    });

    await handler(req, res);
    const body = res._getJSONData();
    expect(res.statusCode).toBe(404);
    expect(body).toHaveProperty('error', 'No reviews found');
  });

  it('should return 405 for unsupported method', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: 'POST',
    });

    await handler(req, res);
    const body = res._getJSONData();
    expect(res.statusCode).toBe(405);
    expect(body).toHaveProperty('error', 'Method Not Allowed');
  });
});
