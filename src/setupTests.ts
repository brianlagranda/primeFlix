import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import { beforeAll, afterEach, afterAll } from 'vitest';

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());