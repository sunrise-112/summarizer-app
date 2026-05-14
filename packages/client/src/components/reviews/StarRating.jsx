import { FaStar, FaRegStar } from "react-icons/fa";

const StarRating = ({ value }) => {
  const placeholders = [1, 2, 3, 4, 5];

  return (
    <div className='flex flex-row gap-1'>
      {placeholders.map((p) =>
        p <= value ? (
          <FaStar key={p} className='text-yellow-400' />
        ) : (
          <FaRegStar key={p} className='text-yellow-400' />
        )
      )}
    </div>
  );
};

export default StarRating;
