import { useEffect, useState } from "react";
import "./App.css";
import ReviewList from "./ReviewList";
import { deleteReviews, getReviews, updateReviews, createReviews } from "./api";
import ReviewForm from "./ReviewForm";
import useAsync from "./hooks/useAsync";
import { LocaleProvider } from "./contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

const LIMIT = 6;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [loadingError, isLoading, getReviewsAsync] = useAsync(getReviews);
  const [totalView, setTotalView] = useState(false);

  const handleNewestClick = () => {
    setOrder("createdAt");
    setTotalView(false);
  };
  const handleBestClick = () => {
    setOrder("rating");
    setTotalView(false);
  };

  const handleDelete = async (id) => {
    const result = await deleteReviews(id);
    if (!result) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = async (options) => {
    let result = await getReviewsAsync(options);
    if (!result) return;
    const { reviews, paging } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleTotalView = () => setTotalView(true);

  // 성공시 item에 실시간 반영
  const handleCreateSuccess = (review) => {
    setItems((prevValue) => [review, ...prevValue]);
  };

  // 수정 성공시 item에 실시간 반영
  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: totalView ? 100 : LIMIT });
  }, [order, totalView]);

  return (
    <LocaleProvider>
      <div>
        <LocaleSelect />
        <button onClick={handleTotalView}>전체 보기</button>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewForm
        onSubmitSuccess={handleCreateSuccess}
        onSubmit={createReviews}
      />
      <ReviewList
        items={items}
        onDelete={handleDelete}
        onUpdate={updateReviews}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </LocaleProvider>
  );
}

export default App;
