import axios from "axios";
import StarRating from "./StarRating";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HiSparkles } from "react-icons/hi2";

import magicSound from "../../assets/audio/magic_sound.mp3";

const ReviewList = ({ productId = 2 }) => {
  const magicAudio = new Audio(magicSound);
  magicAudio.volume = 0.3;

  const {
    data: reviewsData,
    error,
    isLoading,
    refetch: reviewsRefetch,
  } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviews(),
  });

  const { isPending: summarizeIsPending, mutateAsync } = useMutation({
    mutationKey: ["summary", productId],
    mutationFn: () => handleSummarize(),
    onSuccess: () => reviewsRefetch(),
  });

  const fetchReviews = async () => {
    const { data } = await axios.get(`/api/products/${productId}/reviews`);
    return data;
  };

  const handleSummarize = async () => {
    try {
      const { data } = await axios.post(
        `/api/products/${productId}/reviews/summarize`
      );

      magicAudio.play();
      return data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (error)
    return (
      <div className='text-red-500 text-xl font-bold p-5'>
        Error fetching reviews. please try again!
      </div>
    );

  if (isLoading)
    return (
      <div className='grid grid-cols-2 gap-4 p-4'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i}>
            <Skeleton width={100} />
            <Skeleton width={200} />
            <Skeleton count={2} />
          </div>
        ))}
      </div>
    );

  if (!reviewsData?.reviews.length)
    return (
      <div className='m-4 text-xl font-bold text-red-600'>
        No reviews found for given product!
      </div>
    );

  return (
    <>
      <div className='m-3'>
        {reviewsData?.summary ? (
          <div className='bg-slate-100 p-3 rounded-lg'>
            <h4 className='font-bold'>Summary:</h4>
            <p>{reviewsData?.summary}</p>
          </div>
        ) : (
          <button
            onClick={mutateAsync}
            disabled={summarizeIsPending}
            className='flex flex-row bg-black p-3 rounded-lg text-white font-bold items-center'
          >
            <HiSparkles className='mr-2' />
            {summarizeIsPending ? "Summarizing.." : "Summarize"}
          </button>
        )}
      </div>
      <div className='grid grid-cols-1 gap-5 m-2 md:grid-cols-2 sm:grid-cols-1'>
        {reviewsData.reviews?.map((r) => (
          <div
            key={r.id}
            className='flex flex-col gap-4 p-5 mt-2 rounded-lg bg-stone-50 hover:-translate-y-1 ease-in duration-75'
          >
            <div>{r.author}</div>
            <div className='flex flex-row'>
              <StarRating value={parseInt(r.rating)} />
            </div>
            <div>{r.content}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewList;
