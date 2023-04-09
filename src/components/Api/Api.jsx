export function fetchQuery(searchQuery, page) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '34938122-ec770eb9c2ed6692cbd960d48';

  return fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}
        &image_type=photo&orientation=horizontal&page&per_page=12&page=${page}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No image with that name ${searchQuery.tags}`)
    );
  });
}
