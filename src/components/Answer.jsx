import { MdOutlineReportProblem, MdOutlineThumbUp } from "react-icons/md";
import { Reply } from "../sections/dashboard/feed/Replies";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { likeAAnswer } from "../apiCalls/answer";

const Answer = ({ item, openReportModal , bySelf}) => {
  const [liked, setLiked] = useState(item?.likes?.length !== 0);
  const [likeValue, setLikeValue] = useState(item?._count?.likes);


  useEffect(() => {
    setLiked(bySelf ? false : item?.likes?.length !== 0);
    setLikeValue(bySelf ? 0 : item?._count?.likes);
  }, [item , bySelf]);

  const likeReply = async () => {
    const data = {
        answerid: item?.id,
    };
    const response = await likeAAnswer(data);
    if (response?.status === 201) {
      if (liked) {
        setLikeValue((likeValue) => likeValue - 1);
        setLiked(false);
      } else {
        setLikeValue((likeValue) => likeValue + 1);
        setLiked(true);
      }
    } 
  };

  return (
    <div key={item?.id} className="flex gap-5 items-center">
      <div className="flex gap-5 mt-5 items-center">
        <div className="p-2 shadow-lg bg-white rounded-full flex gap-2">
          <MdOutlineThumbUp
            onClick={likeReply}
            className={`h-5 w-5 ${
              liked ? "text-blue-500" : "text-gray-400"
            } cursor-pointer`}
          />
          <span>{likeValue}</span>
        </div>

        <div
          onClick={() => openReportModal("reply", item?.id)}
          className="shadow-md p-2 rounded-full"
        >
          <MdOutlineReportProblem className="h-5 w-5 text-blue-500 cursor-pointer" />
        </div>
      </div>
      <Reply bySelf={bySelf} answer={item}/>
    </div>
  );
};

export default Answer;

Answer.propTypes = {
  item: PropTypes.object,
  likeReply: PropTypes.func,
  openReportModal: PropTypes.func,
  question: PropTypes.object,
  user : PropTypes.object,
  bySelf : PropTypes.bool
};
