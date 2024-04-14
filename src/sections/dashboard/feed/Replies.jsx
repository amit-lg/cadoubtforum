import SectionHeading from "../../../components/SectionHeading";
import Card from "../../../components/ui/Card";
import Avatar from "../../../components/ui/Avatar";
import PropTypes from "prop-types";
// import EachActionButton from "../../../components/EachActionButton";
// import { MdThumbUp } from "react-icons/md";
// import { useState } from "react";
import moment from "moment";
import Loader from "../../../components/Loader";
import {
  openImagePopup,
  setImagePopupImg,
} from "../../../redux/reducers/appReducer";
import { useDispatch , useSelector} from "react-redux";

const Replies = ({ replies, loading }) => {
  return (
    <div>
      <div className="h-[70vh] w-full">
        <SectionHeading text="Replies" />
        <div className="mt-2 py-3 px-1 h-[96%] flex flex-col gap-5 overflow-y-scroll scrollbar-none">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : replies?.length === 0 ? (
            <div className="text-center flex items-center justify-center h-full w-full">
              No Replies yet
            </div>
          ) : (
            replies?.map((reply) => (
              <EachQuestionReplies key={reply?._id} reply={reply} />
            ))
          )}

          {/* <EachQuestionReplies />
          <EachQuestionReplies />
          <EachQuestionReplies /> */}
        </div>
      </div>
    </div>
  );
};

export default Replies;

export const EachQuestionReplies = ({ reply }) => {
  return (
    // <Link to={"/question/1"}>
    <Card className="flex bg-white flex-col cursor-pointer py-1 rounded-md">
      <div className="flex overflow-hidden items-center mx-1 rounded-md">
        <div className="flex flex-col gap-2 relative w-full">
          <div className="rounded-md">
            <span className="font-semibold text-sm">Question &nbsp;</span>
            <span> - {reply?.question?.text}</span>
          </div>
          <div>
            {/* <span className="font-semibold text-sm">Replies &nbsp;</span> */}
            <div className="flex flex-col ">
              <Reply answer={reply} />
            </div>
          </div>
        </div>
      </div>
    </Card>
    // </Link>
  );
};

export const Reply = ({ answer , bySelf}) => {
  const {user} = useSelector((state) => state.user);
  let replyBy = {
    name : "",
    image : "",
  };

  if(bySelf){
    replyBy = {
      name: user?.name,
      image: user?.image,
    };
  }else{
    replyBy = {
      name: answer?.User?.fname + " " + answer?.User?.lname,
      image: answer?.User?.profile,
    };
  }

  const dispatch = useDispatch();
  // const [likeCount, setLikeCount] = useState(answer?.likes?.length || 0);
  const openPopUp = (url) => {
    dispatch(openImagePopup());
    dispatch(setImagePopupImg(url));
  };
  return (
    <Card className="gap-2 text-sm flex items-start w-full">
      <Avatar user={replyBy} size="small" />
      <div className=" w-full flex flex-col rounded-md">
        <div className="flex text-orange-300 font-semibold items-center gap-1 justify-between">
          <span>
            {replyBy?.name}
          </span>
          {/* <div className="flex text-gray-400 mx-3 items-center gap-2">
            <EachActionButton Icon={MdThumbUp} value={likeCount} />
          </div> */}
        </div>
        <p className="bg-slate-200 p-1 rounded-md">{answer?.text}</p>
        <div>
          <div className="flex justify-between items-center self-end mt-2">
            {answer?.attachments?.length !== 0 && (
              <div className="flex gap-2 items-center">
                {answer?.attachments?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex items-center gap-1 text-gray-400"
                  >
                    <img
                      src={item?.ImagePath}
                      onClick={() => dispatch(openPopUp(item?.ImagePath))}
                      alt=""
                      className="h-12 w-12 rounded-md object-cover cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-1 text-[10px] text-gray-500 text-right">
              {moment(answer?.createdAt).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

EachQuestionReplies.propTypes = {
  reply: PropTypes.object,
};

Reply.propTypes = {
  answer: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.string,
  bySelf: PropTypes.bool
};

Replies.propTypes = {
  replies: PropTypes.array,
  loading: PropTypes.bool,
};
