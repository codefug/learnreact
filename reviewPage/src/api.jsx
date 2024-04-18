const BASEURL = `https://learn.codeit.kr/api`;

export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `${BASEURL}/film-reviews?${query}&&offset=${offset}&&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("리뷰 실패");
  }
  const body = await response.json();
  return body;
}

export async function createReviews(formData) {
  const response = await fetch(`${BASEURL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰 실패");
  }
  const body = await response.json();
  return body;
}

export async function updateReviews(id, formData) {
  const response = await fetch(`${BASEURL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰 수정 실패");
  }
  const body = await response.json();
  return body;
}

export async function deleteReviews(id) {
  const response = await fetch(`${BASEURL}/film-reviews/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("리뷰 삭제 실패");
  }
  const body = await response.json();
  return body;
}
