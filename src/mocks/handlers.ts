import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get(
        'https://api.themoviedb.org/3/search/movie',
        ({ request: req }) => {
            const requestUrl = new URL(req.url);

            const query = requestUrl.searchParams.get('query');

            if (query === 'transformer') {
                console.log(
                    'Captured a "GET /search/movie?query=transformer" request',
                );

                return HttpResponse.json(
                    {
                        results: [
                            {
                                id: 1,
                                title: 'Transformers',
                                release_date: '2007-07-03',
                                overview:
                                    'An action-packed movie about robots.',
                            },
                        ],
                    },
                    { status: 200 },
                );
            }

            return HttpResponse.json({ results: [] }, { status: 200 });
        },
    ),
];
