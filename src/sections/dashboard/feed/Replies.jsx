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
import { BiEdit } from "react-icons/bi";
import { useState } from "react";
import { MdClose } from "react-icons/md";

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
              <EachQuestionReplies size={size} key={reply?.id} reply={reply} />
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
      <div className="flex bg-white flex-col cursor-pointer rounded-md shadow">
        <div className="flex overflow-hidden items-center mx-1 rounded-md">
          <div className="flex flex-col gap-2 relative w-full">
            <div className="rounded-md mt-2 ml-2">
              <span className="font-semibold text-sm">Question &nbsp;</span>
              <span>
                {" "}
                - {reply?.question?.text?.slice(0, 100)}{" "}
                {reply?.question?.text?.length > 100 ? "..." : ""}
              </span>
            </div>
            <div>
              {/* <span className="font-semibold text-sm">Replies &nbsp;</span> */}
              <div className="flex flex-col ">
                <Reply size={size} answer={reply} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const Reply = ({ answer, bySelf, size }) => {
  const { user } = useSelector((state) => state.user);
  const [editable, setEditable] = useState(false);
  const [attachments, setAttachments] = useState(answer?.attachments || []);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  const handleEditable = () => {
    setEditable(!editable);
  };

  const removeImgFromAttachments = (id) => {
    setAttachments(attachments?.filter((attachment) => attachment?.id !== id));
  };

  const removeAddedImages = (idx) => {
    const newImages = [...attachments];
    const newImagesPreview = [...imagesPreview];

    newImagesPreview.splice(idx, 1);
    newImages.splice(idx, 1);

    setAttachments(newImages);
    setImagesPreview(newImagesPreview);
  };

  return (
    <Card className="gap-2 text-sm flex items-start w-full">
      <Avatar user={replyBy} size="small" />
      <div className=" w-full flex flex-col rounded-md space-y-2">
        <div className="flex text-orange-300 font-semibold items-center gap-1 justify-between">
          <span>{replyBy?.name}</span>
          {/* {
            size === "large" && (
              // If createat and date now is less than 1 hours
              // new Date(answer?.createdAt) === new Date(answer?.updatedAt) && (
              <div onClick={handleEditable}>
                <BiEdit className="text-blue-500" />
              </div>
            )
            // )
          } */}
        </div>
        {/* {editable ? (
          <div className="w-full h-full">
            <p
              contentEditable={true}
              className="min-h-[100px] bg-slate-200 p-1 rounded-md"
            >
              {size === "small" ? answer?.text?.slice(0, 87) : answer?.text}{" "}
              {size === "small" ? (answer?.text?.length > 90 ? "..." : "") : ""}
            </p>
            <div>
              <input type="file" multiple accept="image/*" />
            </div>
          </div>
        ) : (
          <p className="bg-slate-200 p-1 rounded-md">
            {size === "small" ? answer?.text?.slice(0, 87) : answer?.text}{" "}
            {size === "small" ? (answer?.text?.length > 90 ? "..." : "") : ""}
          </p>
        )} */}

        <p className="bg-slate-200 p-1 rounded-md">
          {size === "small" ? answer?.text?.slice(0, 87) : answer?.text}{" "}
          {size === "small" ? (answer?.text?.length > 90 ? "..." : "") : ""}
        </p>
        <div>
          <div
            className={`flex mt-3 ${
              answer?.attachments?.length === 0
                ? "justify-end"
                : "justify-between"
            } items-end self-end`}
          >
            {size === "large" && (
              <div className="px-3 flex gap-2 w-[100px]  items-center overflow-x-scroll sm:w-fit h-[70px]">
                {attachments?.length !== 0 &&
                  attachments?.map((attachment, index) => (
                    <div
                      onClick={() => openPopUp(attachments)}
                      key={attachment?.id}
                      className="relative h-[50px] min-w-[50px] rounded-md"
                    >
                      <img
                        className="h-[50px] rounded-md  w-[50px]"
                        src={attachment?.ImagePath}
                        alt={`attachment-${attachment?.id}`}
                      />

                      {editable && (
                        <div
                          onClick={(e) => removeImgFromAttachments(e, index)}
                          className="absolute -top-2 -right-2 bg-gray-200 rounded-full text-gray-600"
                        >
                          <MdClose className="text-xs" />
                        </div>
                      )}
                    </div>
                  ))}
                {imagesPreview?.length !== 0 &&
                  imagesPreview?.map((attachment, index) => (
                    <div
                      key={attachment}
                      className="relative h-[50px] min-w-[50px] rounded-md"
                    >
                      <img
                        className="h-[50px] rounded-md  w-[50px]"
                        src={attachment}
                        alt={`attachment-${index}`}
                      />

                      {editable && (
                        <div
                          onClick={(e) => removeAddedImages(e, index)}
                          className="absolute -top-2 -right-2 bg-gray-200 rounded-full text-gray-600"
                        >
                          <MdClose className="text-xs" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          <div className="mt-1 text-[10px] text-gray-500 text-right flex">
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
