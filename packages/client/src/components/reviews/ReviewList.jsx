import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import StarRating from "./StarRating";
import Skeleton from "react-loading-skeleton";

const ReviewList = ({ productId = 2 }) => {
  const [reviewsData, setReviewsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/api/products/${productId}/reviews`);

    console.log("Data", data);
    setReviewsData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (isLoading)
    return (
      <div className='flex flex-col gap-4 p-4'>
        {[1, 2, 3].map((i) => (
          <div>
            <Skeleton key={i} width={100} />
            <Skeleton key={i} width={200} />
            <Skeleton key={i} count={2} />
          </div>
        ))}
      </div>
    );

  return (
    <div className='m-4'>
      {reviewsData.reviews?.map((r) => (
        <div
          key={r.id}
          className='flex flex-col gap-4 p-3 mt-2 rounded-lg bg-stone-50'
        >
          <div>{r.author}</div>
          <div className='flex flex-row'>
            <StarRating value={parseInt(6)} />
          </div>
          <div>{r.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
