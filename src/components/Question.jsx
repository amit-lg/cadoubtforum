/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from "./ui/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./ui/Card";
import {
  MdClose,
  MdComment,
  MdOutlineReportProblem,
  MdOutlineThumbUp,
  MdThumbUp,
  MdVisibility,
} from "react-icons/md";
import { TbPinned } from "react-icons/tb";
import PropTypes from "prop-types";
import EachActionButton from "./EachActionButton";
import {
  likeAQuestion,
  pinAQuestion,
  viewAQuestion,
} from "../apiCalls/question";
import { useEffect, useState } from "react";
import moment from "moment";
import Button from "./Button";
import { FaCamera } from "react-icons/fa6";
import { addAnswer } from "../apiCalls/answer";
import {
  addToLikedQuestion,
  openImagePopup,
  setImagePopupImg,
  setReportData,
  setShowReportModal,
} from "../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";

const Question = ({
  size,
  question,
  setRepliesAdded,
  repliesAdded,
  showReplyBox,
  setShowReplyBox,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { likedQuestion } = useSelector((state) => state.app);

  const user = {
    name: question?.User?.fname,
    image: question?.User?.profile,
  };

  const [liked, setLiked] = useState(
    question?.likes ? question?.likes?.length !== 0 : false
  );
  const [likeValue, setLikeValue] = useState();
  const [fullSize, setFullSize] = useState(false);

  const [viewed, setViewed] = useState(question?.views?.length !== 0);
  const [viewValue, setViewValue] = useState(question?._count?.views);

  const [pinned, setPinned] = useState(question?.pins?.length !== 0);

  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");

  // const [showReplyBox, setShowReplyBox] = useState(false);

  const likeQuestion = async () => {
    const data = {
      questionid: question.id,
    };

    const response = await likeAQuestion(data);
    if (response.status === 200) {
      if (liked) {
        setLikeValue((likeValue) => likeValue - 1);
        setLiked(false);
        const data = {
          questionid: question.id,
          liked: false,
          count: question?._count?.likes - 1,
        };
        dispatch(addToLikedQuestion(data));
      } else {
        setLikeValue((likeValue) => likeValue + 1);
        setLiked(true);
        const data = {
          questionid: question.id,
          liked: true,
          count: question?._count?.likes + 1,
        };
        dispatch(addToLikedQuestion(data));
      }
    }
  };

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const onFileChange = (event) => {
    if (!event.target.files) return;
    const files = event?.target?.files;

    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagesPreview([...imagesPreview, ...newImages]);
      setImages([...images, ...files]);
    }
  };

  const removeImg = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImagesPreview = [...imagesPreview];
    newImagesPreview.splice(index, 1);
    setImagesPreview(newImagesPreview);
  };

  const pinQuestion = async () => {
    const data = {
      questionid: question.id,
    };

    const response = await pinAQuestion(data);
    if (response.status === 200) {
      if (pinned) {
        setPinned(false);
      } else {
        setPinned(true);
      }
    }
  };

  const addReply = async (e) => {
    e.preventDefault();
    if (reply === "") {
      setReplyError("Please enter a reply");
      return;
    }
    const data = new FormData();
    data.append("answerText", reply);
    data.append("questionid", question.id);

    for (let i = 0; i < images.length; i++) {
      data.append("pictures", images[i]);
    }

    const response = await addAnswer(data);
    if (response?.status === 201) {
      setRepliesAdded([...repliesAdded, response.data]);
      setShowReplyBox(false);
    }
    setReply("");
  };

  const toggleReplyBox = () => {
    setShowReplyBox((showReplyBox) => !showReplyBox);
    setReply("");
    setImages([]);
    setImagesPreview([]);
  };

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const openReportModal = (type, id) => {
    dispatch(setShowReportModal(true));
    dispatch(setReportData({ questionId: id }));
  };

  const openPopUp = (url) => {
    dispatch(openImagePopup());
    dispatch(setImagePopupImg(url));
  };

  const goToQuestion = async () => {
    navigate(`/question/${question.id}`, {
      state: { from: location.pathname },
    });
    if (viewed) {
      return;
    }
    const response = await viewAQuestion({ questionid: question.id });
    if (response.status === 200) {
      setViewed(true);
    }
  };

  const viewQuestion = async () => {
    setViewed(true);
    const data = {
      questionid: question.id,
    };
    const response = await viewAQuestion(data);
    if (response.status === 200) {
      setViewed(true);
    }
  };

  useEffect(() => {
    const exists = likedQuestion.findIndex(
      (item) => item.questionid === question.id
    );

    setViewed(question?.views?.length !== 0);

    if (exists >= 0) {
      console.log("--------------------------------");
      console.log(likedQuestion[exists]);
      console.log("--------------------------------");
      setLikeValue(likedQuestion[exists]?.count);
      setLiked(likedQuestion[exists]?.liked);
    } else {
      setLikeValue(question?._count?.likes);
      setLiked(question?.likes?.length !== 0);
    }
    // setLikeValue(
    //   likedQuestion[exists]?.count
    //     ? likedQuestion[exists]?.count
    //     : question?._count?.likes
    // );

    // setLiked(likedQuestion[exists]?.liked ? likedQuestion[exists]?.liked : question?.likes?.length !== 0);
    setPinned(question?.pins?.length !== 0);
  }, [question]);

  return (
    <div>
      <div
        className={`px-1 flex items-center flex-col md:flex-row gap-3 ${
          size === "large" ? "w-[95%]" : "w-full"
        } `}
      >
        <div onClick={goToQuestion} className="w-full">
          <Card className="relative flex bg-white flex-col my-3 cursor-pointer min-h-24 md:min-h-32 rounded-md px-1 py-1 gap-2">
            <div
              className={`${
                size === "large" ? "flex" : "flex"
              } justify-between`}
            >
              <div className="flex gap-3 items-center">
                <Avatar user={user} />
                <div className="flex  text-orange-300 font-semibold items-center gap-1">
                  {question?.User?.fname + " " + question?.User?.lname}
                </div>
              </div>

              <div
                className={`${
                  size === "large" ? "invisible" : "flex"
                } text-gray-400 mx-3 items-center gap-2`}
              >
                <EachActionButton
                  selected={viewed}
                  Icon={<MdVisibility />}
                  value={viewValue}
                  onClick={viewQuestion}
                />

                <EachActionButton
                  selected={liked}
                  Icon={<MdThumbUp />}
                  value={likeValue}
                />

                <EachActionButton
                  Icon={<MdComment />}
                  value={question?._count?.answers}
                />
              </div>
            </div>
            <div
              className={`flex ${
                size === "large" ? "min-h-[80px]" : "h-auto"
              } mx-3 bg-slate-200 p-2 rounded-md`}
            >
              {/* Truncate the text if it's length is greater than 60 */}
              {size === "large" ? (
                <p>{question?.text}</p>
              ) : (
                <p>
                  {question?.text?.length > 60
                    ? question?.text?.slice(0, 60) + "..."
                    : question?.text}
                </p>
              )}
            </div>
            <div className="flex justify-end lg:justify-between items-center pt-2 px-1">
              <div className="hidden gap-3 lg:flex text-sm font-semibold text-gray-400 overflow-hidden h-5 w-2/3 whitespace-nowrap mx-3">
                <div className="flex">
                  {question?.fallnumber?.Points[0]?.topics?.Subjects?.name}
                </div>
                <div className="flex">
                  {question?.fallnumber?.Points[0]?.topics?.name === "empty"
                    ? ""
                    : question?.fallnumber?.Points[0]?.topics?.name}
                </div>
                <div className="flex">
                  {question?.fallnumber?.Points[0]?.name}
                </div>
              </div>
              <div className="flex items-center justify-between self-end pr-2">
                <span className="text-xs text-gray-500 mx-3">
                  {moment(question?.createdAt).fromNow()}
                </span>
                {size === "large" && (
                  <Button onClick={toggleReplyBox}>
                    {showReplyBox ? "Cancel" : "Answer"}
                  </Button>
                )}
              </div>
            </div>
            <div className="px-3 flex gap-2">
              {size === "large" &&
                question?.attachments?.length !== 0 &&
                question?.attachments?.map((attachment) => (
                  <div
                    onClick={() => openPopUp(attachment?.ImagePath)}
                    key={attachment?.id}
                    className="h-12 w-12 rounded-md"
                  >
                    <img
                      className="h-12 rounded-md object-cover w-12"
                      src={attachment?.ImagePath}
                      alt={`attachment-${attachment?.id}`}
                    />
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {size === "large" && (
          <div className="flex md:flex-col flex-row gap-3 content-between justify-center self-end md:self-center">
            <div className="flex md:flex-col flex-row gap-1 items-center">
              <MdOutlineThumbUp
                onClick={likeQuestion}
                className={`h-6 w-6 ${
                  liked ? "text-blue-500" : "text-gray-400"
                } cursor-pointer`}
              />
              <span>{likeValue}</span>
            </div>

            <div>
              <TbPinned
                onClick={pinQuestion}
                className={`h-6 w-6 ${
                  pinned ? "text-blue-500" : "text-gray-400"
                } cursor-pointer`}
              />
            </div>

            <div>
              <MdOutlineReportProblem
                onClick={() => openReportModal("question", question?.id)}
                className="h-6 w-6 text-blue-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Reply Box */}
      <div
        className={`ml-20 mr-10 transition-all ease-in-out duration-300 overflow-hidden ${
          showReplyBox ? "h-56 shadow-md" : "h-0"
        }`}
      >
        <Card
          className={`w-full h-full shadow-none ${
            size === "large" ? "flex" : "hidden"
          }`}
        >
          {showReplyBox && (
            <form
              onSubmit={addReply}
              className="p-1 flex flex-col gap-5 w-full"
            >
              <textarea
                className={`w-full border-none outline-none rouded-md p-2 resize-none ${
                  replyError ? "border-red-500" : ""
                }`}
                rows={6}
                value={reply}
                onChange={handleReplyChange}
                placeholder="Enter your answer here"
                required
              />
              <div className="h-4">
                <p>{replyError}</p>
              </div>
              <div className="relative w-full">
                <div className="flex items-center gap-3">
                  <input
                    onChange={onFileChange}
                    type="file"
                    id="avatar"
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                  <div className="h-12 w-full flex items-center gap-3">
                    {imagesPreview.length > 0 &&
                      imagesPreview?.map((image, index) => (
                        <div key={index} onClick={() => removeImg(index)}>
                          <div className="h-10 w-10 rounded-md relative flex items-center justify-center">
                            <img className="rounded-md" src={image} alt="" />
                            <div className="absolute cursor-pointer -right-2 -top-2 bg-white rounded-full flex items-center justify-center leading-3">
                              <div className="h-4 w-4 flex items-center justify-center">
                                <MdClose className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex items-center gap-3 self-end">
                    <label
                      htmlFor="avatar"
                      className="shadow bg-white p-2  rounded-full text-blue-500  bottom-1 right-1"
                    >
                      <FaCamera />
                    </label>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Question;

Question.propTypes = {
  size: PropTypes.string,
  question: PropTypes.object,
  user: PropTypes.object,
  setRepliesAdded: PropTypes.func,
  repliesAdded: PropTypes.bool,
  showReplyBox: PropTypes.bool,
  setShowReplyBox: PropTypes.func,
};
