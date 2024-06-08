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
import { FaCamera } from "react-icons/fa6";
import { editAnswer, removeAnswerImage } from "../../../apiCalls/answer";
import Button from "../../../components/Button";

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
  const [error, setError] = useState("");

  const [attachments, setAttachments] = useState(answer?.attachments || []);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [images, setImages] = useState([]);

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

  const handleImages = (event) => {
    let files = event?.target?.files;

    const selectedFiles = files;
    const newFiles = Array.from(selectedFiles);
    const tempImages = [...images];
    const tempImagesPreview = [...imagesPreview];

    newFiles.forEach((file) => {
      if (file.type.startsWith("image/") && file.size <= 2000000) {
        if (tempImages.length + attachments.length < 5) {
          tempImages.push(file);
          tempImagesPreview.push(URL.createObjectURL(file));
        } else {
          setError("You can only upload a maximum of 5 images");
        }
      } else {
        if (!file.type.startsWith("image/")) {
          setError("Selected file is not an image");
        } else if (file.size > 2000000) {
          setError("Image size should be less than 2MB");
        }
      }
    });

    setImages(tempImages);
    setImagesPreview(tempImagesPreview);
  };

  const removeImgFromAttachments = async (id) => {
    console.log(id);
    const response = await removeAnswerImage(id);
    if (response.status === 200) {
      setAttachments(
        attachments?.filter((attachment) => attachment?.id !== id)
      );
    }
  };

  const removeAddedImages = (idx) => {
    console.log(idx);
    const newImages = [...images];
    const newImagesPreview = [...imagesPreview];

    newImagesPreview.splice(idx, 1);
    newImages.splice(idx, 1);

    setImages(newImages);
    setImagesPreview(newImagesPreview);
  };

  const handleEdit = async () => {
    console.log("Running");
    const text = document.querySelector(
      `#edit-question-text-${answer?.id}`
    ).innerText;
    const formData = new FormData();
    formData.append("answerText", text);
    formData.append("answerID", answer.id);
    for (let i = 0; i < imagesPreview.length; i++) {
      formData.append("pictures", imagesPreview[i]);
    }
    const response = await editAnswer(formData);
    if (response?.status === 200 || response?.status === 201) {
      // setQuestionText(text);
      setEditable(!editable);
    }
  };

  return (
    <Card className="gap-2 text-sm flex items-start w-full">
      <Avatar user={replyBy} size="small" />
      <div className=" w-full flex flex-col rounded-md space-y-2">
        <div className="flex text-orange-300 font-semibold items-center gap-1 justify-between">
          <span>{replyBy?.name}</span>
          {answer?.userId === user?.userId &&
            size === "large" &&
            // If createat and date now is less than 1 hours
            new Date(answer?.createdAt) === new Date(answer?.updatedAt) && (
              <div className="cursor-pointer" onClick={handleEditable}>
                <BiEdit className="text-blue-500" />
              </div>
            )}
        </div>
        {editable ? (
          <div className="w-full h-full min-h-[100px] bg-slate-200 p-1 rounded-md flex flex-col justify-between">
            <p
              id={`edit-question-text-${answer?.id}`}
              contentEditable={true}
              className="h-[calc(100%-30px)] outline-none"
            >
              {size === "small" ? answer?.text?.slice(0, 87) : answer?.text}{" "}
              {size === "large" ? (answer?.text?.length > 90 ? "..." : "") : ""}
            </p>
            <div className="h-[30px] flex items-center justify-end">
              <label
                htmlFor="edit-answer-image"
                className="m-1 h-fit w-fit p-1 bg-gray-300 rounded-full flex items-center justify-center
                      "
              >
                <FaCamera className="text-blue-500 text-sm" />
              </label>
              <input
                type="file"
                name="edit-answer-image"
                id="edit-answer-image"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImages}
              />
            </div>
          </div>
        ) : (
          <p className="bg-slate-200 p-1 rounded-md">
            {size === "small" ? answer?.text?.slice(0, 87) : answer?.text}{" "}
            {size === "large" ? (answer?.text?.length > 90 ? "..." : "") : ""}
          </p>
        )}

        {/* <p className="bg-slate-200 p-1 rounded-md">
          {size === "small" ? answer?.text?.slice(0, 87) : answer?.text}{" "}
          {size === "large" ? (answer?.text?.length > 90 ? "..." : "") : ""}
        </p> */}
        <div>
          <div
            className={`w-full flex mt-3 ${
              attachments?.length === 0 && imagesPreview?.length === 0
                ? "justify-end"
                : "justify-between"
            } items-end self-end`}
          >
            {size === "large" && attachments?.length !== 0 && (
              <div className="px-3 flex gap-2 w-[100px]  items-center overflow-x-scroll sm:w-fit h-[70px]">
                {attachments?.length !== 0 &&
                  attachments?.map((attachment) => (
                    <div
                      key={attachment?.id}
                      className="relative h-[50px] min-w-[50px] rounded-md"
                    >
                      <img
                        onClick={() => openPopUp(attachments)}
                        className="h-[50px] rounded-md  w-[50px]"
                        src={attachment?.ImagePath}
                        alt={`attachment-${attachment?.id}`}
                      />

                      {editable && (
                        <div
                          onClick={() =>
                            removeImgFromAttachments(attachment?.id)
                          }
                          className="cursor-pointer absolute -top-2 -right-2 bg-gray-200 rounded-full text-gray-600"
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
                          onClick={() => removeAddedImages(index)}
                          className="absolute -top-2 -right-2 bg-gray-200 rounded-full text-gray-600 cursor-pointer"
                        >
                          <MdClose className="text-xs" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            <div className="mt-1 flex flex-col text-[10px] text-gray-500 text-right">
              {editable && (
                <Button onClick={handleEdit} className="px-1 py-2 text-xs">
                  Submit
                </Button>
              )}
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
