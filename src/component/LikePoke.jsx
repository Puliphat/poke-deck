import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

function LikePoke() {
  const [like, setLike] = useState(false);

  const toggleLike = () => {    
    setLike((check) => !check);
  };

  return (
    <button onClick={toggleLike}>
        {like ? <FaHeart className="text-pink-500"  /> : <FaRegHeart />}
    </button>
  );
}

export default LikePoke;
