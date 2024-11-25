import { describe, expect, it } from 'vitest';
import { fetchByQuery } from './mediaApi';
import { mockMovie } from '../mocks/MediaMocks';

describe('fetchByQuery', () => {
    it('fetches movies correctly', async () => {
        const movies = await fetchByQuery('movie', 'transformer');
        expect(movies).toEqual([mockMovie]);
    });
});
