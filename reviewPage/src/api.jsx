export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}&&offset=${offset}&&limit=${limit}`
  );
  const body = await response.json();
  return body;
}
