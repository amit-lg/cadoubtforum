import SectionHeading from "../../../components/SectionHeading";
import Card from "../../../components/ui/Card";
import Avatar from "../../../components/ui/Avatar";
import PropTypes from "prop-types";
import moment from "moment";
import Loader from "../../../components/Loader";
import {
  openImagePopup,
  setImagePopupImg,
} from "../../../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Replies = ({ replies, loading, size }) => {
  return (
    <div>
      <div className="h-[387px] w-full p-2">
        <SectionHeading text="Recently Answered" />
        <div className="mt-3 px-2 py-3 h-[calc(100%-28px)] flex flex-col gap-5 overflow-y-scroll scrollbar-none">
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
              <EachQuestionReplies size={size} key={reply?._id} reply={reply} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Replies;

export const EachQuestionReplies = ({ size, reply }) => {
  return (
    <Link to={`/question/${reply?.question?.id}`}>
      <Card className="flex bg-white flex-col cursor-pointer py-1 rounded-md">
        <div className="flex overflow-hidden items-center mx-1 rounded-md">
          <div className="flex flex-col gap-2 relative w-full">
            <div className="rounded-md">
              <span className="font-semibold text-sm">Question &nbsp;</span>
              <span> - {reply?.question?.text?.slice(0, 100)} {reply?.question?.text?.length > 100 ? "..." : ""}</span>
            </div>
            <div>
              {/* <span className="font-semibold text-sm">Replies &nbsp;</span> */}
              <div className="flex flex-col ">
                <Reply size={size} answer={reply} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export const Reply = ({ answer, bySelf, size }) => {
  const { user } = useSelector((state) => state.user);
  let replyBy = {
    name: "",
    image: "",
  };

  if (bySelf) {
    replyBy = {
      name: user?.name,
      image: user?.image,
    };
  } else {
    replyBy = {
      name: answer?.User?.fname + " " + answer?.User?.lname,
      image: answer?.User?.profile,
    };
  }

  const dispatch = useDispatch();
  const openPopUp = (url) => {
    dispatch(openImagePopup());
    dispatch(setImagePopupImg(url));
  };
  return (
    <Card className="gap-2 text-sm flex items-start w-full">
      <Avatar user={replyBy} size="small" />
      <div className=" w-full flex flex-col rounded-md">
        <div className="flex text-orange-300 font-semibold items-center gap-1 justify-between">
          <span>{replyBy?.name}</span>
        </div>
        <p className="bg-slate-200 p-1 rounded-md">
          {size === "small" ? answer?.text?.slice(0, 87) : answer?.text}{" "}
          {size === "small" ? (answer?.text?.length > 90 ? "..." : "") : ""}
        </p>
        <div>
          <div className={`flex ${answer?.attachments?.length === 0 ? "justify-end" : "justify-between"} items-center self-end mt-2`}>
            {answer?.attachments?.length !== 0 && (
              <div className="flex gap-2 items-center w-[100px] sm:w-fit overflow-x-scroll">
                {answer?.attachments?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex items-center gap-1 text-gray-400"
                  >
                    <img
                      src={item?.ImagePath}
                      onClick={() => dispatch(openPopUp(answer?.attachments))}
                      alt=""
                      className="w-[50px] min-w-[50px] h-[50px] rounded-md object-contain cursor-pointer"
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
  size: PropTypes.string,
};

Reply.propTypes = {
  answer: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.string,
  bySelf: PropTypes.bool,
  size: PropTypes.string,
};

Replies.propTypes = {
  replies: PropTypes.array,
  loading: PropTypes.bool,
  size: PropTypes.string,
};
