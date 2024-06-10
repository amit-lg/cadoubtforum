/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from "./ui/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./ui/Card";
import {
  MdAdd,
  MdClose,
  MdComment,
  MdOutlineReportProblem,
  MdOutlineThumbUp,
  MdThumbUp,
  MdVisibility,
} from "react-icons/md";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import PropTypes from "prop-types";
import EachActionButton from "./EachActionButton";
import {
  editQuestion,
  likeAQuestion,
  pinAQuestion,
  removeQuestionImage,
  viewAQuestion,
} from "../apiCalls/question";
import { useEffect, useState } from "react";
import moment from "moment";
import Button from "./Button";
import { FaCamera } from "react-icons/fa6";
import { addAnswer } from "../apiCalls/answer";
import {
  addToLikedQuestion,
  addToViewedQuestion,
  openImagePopup,
  setImagePopupImg,
  setReportData,
  setShowReportModal,
} from "../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { removeQuestion } from "../redux/reducers/pinnedQuestionsReducer";
import { BiEdit } from "react-icons/bi";

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

  const { likedQuestion, viewedQuestion } = useSelector((state) => state.app);

  const user = {
    name: question?.User?.fname,
    image: question?.User?.profile,
  };

  const [liked, setLiked] = useState(
    question?.likes ? question?.likes?.length !== 0 : false
  );
  const [likeValue, setLikeValue] = useState();
  const [viewed, setViewed] = useState(question?.views?.length !== 0);
  const [viewValue, setViewValue] = useState(question?._count?.views);

  const [editable, setEditable] = useState(false);

  const [pinned, setPinned] = useState(question?.pins?.length !== 0);

  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");

  const [lengthError, setLengthError] = useState("");
  const [sizeError, setSizeError] = useState("");

  const [questionText, setQuestionText] = useState(question?.text);

  const handleQuestionText = (e) => {
    setQuestionText(e.target.value);
  };

  const handleEditable = () => {
    setEditable(!editable);
  };

  // const [showReplyBox, setShowReplyBox] = useState(false);

  const likeQuestion = async () => {
    const data = {
      questionid: question.id,
    };

    const response = await likeAQuestion(data);
    if (response.status === 200) {
      if (liked) {
        setLikeValue((likeValue) => {
          if (likeValue > 0) {
            return likeValue - 1;
          } else {
            return 0;
          }
        });
        setLiked(false);
        const data = {
          questionid: question.id,
          liked: false,
          count:
            likeValue > question?._count?.likes
              ? likeValue - 1
              : question?._count?.likes - 1,
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

  const [attachments, setAttachments] = useState(question?.attachments);
  const [imagesForQuestion, setImagesForQuestion] = useState([]);
  const [imagesPreviewForQuestion, setImagesPreviewForQuestion] = useState([]);

  const handleEditQuestion = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const text = document.getElementById("edit-question-text").innerText;
    formData.append("qText", text);
    formData.append("qID", question.id);
    for (let i = 0; i < imagesForQuestion.length; i++) {
      formData.append("pictures", imagesForQuestion[i]);
    }
    const response = await editQuestion(formData);
    if (response?.status === 200 || response?.status === 201) {
      setQuestionText(text);
      setEditable(!editable);
    }
  };

  const onFileChange = (event) => {
    let files = event?.target?.files;

    const selectedFiles = files;
    const newFiles = Array.from(selectedFiles);
    const tempImages = [...images];
    const tempImagesPreview = [...imagesPreview];

    newFiles.forEach((file) => {
      if (file.type.startsWith("image/") && file.size <= 2000000) {
        if (tempImages.length < 5) {
          tempImages.push(file);
          tempImagesPreview.push(URL.createObjectURL(file));
        } else {
          setLengthError("You can only upload a maximum of 5 images");
        }
      } else {
        if (!file.type.startsWith("image/")) {
          setSizeError("Selected file is not an image");
        } else if (file.size > 2000000) {
          setSizeError("Image size should be less than 2MB");
        }
      }
    });

    setImages(tempImages);
    setImagesPreview(tempImagesPreview);
  };

  const handleQuestionImages = (event) => {
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
          setLengthError("You can only upload a maximum of 5 images");
        }
      } else {
        if (!file.type.startsWith("image/")) {
          setSizeError("Selected file is not an image");
        } else if (file.size > 2000000) {
          setSizeError("Image size should be less than 2MB");
        }
      }
    });

    setImagesForQuestion(tempImages);
    setImagesPreviewForQuestion(tempImagesPreview);
  };

  const removeImg = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImagesPreview = [...imagesPreview];
    newImagesPreview.splice(index, 1);
    setImagesPreview(newImagesPreview);
  };

  const removeImgFromQuestion = async (e, index) => {
    e.stopPropagation();
    const response = await removeQuestionImage(attachments[index].id);
    if (response.status === 200) {
      const newImages = [...attachments];
      newImages.splice(index, 1);
      setAttachments(newImages);
    }
  };

  const removedAddedImages = (index) => {
    const newImages = [...imagesForQuestion];
    const newImagesPreview = [...imagesPreviewForQuestion];

    newImagesPreview.splice(index, 1);
    newImages.splice(index, 1);

    setImagesPreviewForQuestion(newImagesPreview);
    setImagesForQuestion(newImages);
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

  const openPopUp = (images) => {
    dispatch(openImagePopup());
    dispatch(setImagePopupImg(images));
  };

  const goToQuestion = async () => {
    if (location.pathname === "/question/" + question.id) {
      return;
    }
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
      if (viewed) {
        setViewValue((viewValue) => {
          if (viewValue > 0) {
            return viewValue - 1;
          } else {
            return 0;
          }
        });
        setViewed(false);
        const data = {
          questionid: question.id,
          liked: false,
          count:
            viewValue > question?._count?.likes
              ? viewValue - 1
              : question?._count?.likes - 1,
        };
        dispatch(addToViewedQuestion(data));
      } else {
        setViewValue((viewValue) => viewValue + 1);
        setViewed(true);
        const data = {
          questionid: question.id,
          liked: true,
          count: question?._count?.likes + 1,
        };
        dispatch(addToViewedQuestion(data));
      }
    }
  };

  const pinQuestionAndChangeState = async (e) => {
    e.stopPropagation();
    const data = {
      questionid: question.id,
    };

    const response = await pinAQuestion(data);
    if (response.status === 200) {
      dispatch(removeQuestion(question.id));
    }
  };

  useEffect(() => {
    const exists = likedQuestion.findIndex(
      (item) => item.questionid === question.id
    );
    const viewed = viewedQuestion.findIndex(
      (item) => item.questionid === question.id
    );

    if (exists >= 0) {
      setLikeValue(likedQuestion[exists]?.count);
      setLiked(likedQuestion[exists]?.liked);
    } else {
      setLikeValue(question?._count?.likes);
      setLiked(question?.likes?.length !== 0);
    }

    if (viewed >= 0) {
      setViewed(true);
    } else {
      setViewed(question?.views?.length !== 0);
    }

    setPinned(question?.pins?.length !== 0);
  }, [question]);

  return (
    <div
      className={`
      p-1
      mb-5
      rounded-md
        ${size === "large" ? "min-h-24 md:min-h-32" : "min-h-24 md:min-h-32"} 
        ${size === "large" ? "md:w-[95%] w-full" : "w-full"} 
      `}
      onClick={goToQuestion}
    >
      <div
        className={`
          flex items-center flex-col md:flex-row gap-3 rounded-md w-full
        `}
      >
        <Card className="w-full">
          <div
            className={`relative flex flex-col cursor-pointer rounded-md px-1 gap-1 sm:gap-2  w-full p-1 h-max `}
          >
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
                } hidden sm:flex text-gray-400 mx-3 items-center gap-2`}
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

              {size === "large" &&
                // If createat and date now is less than 1 hours
                new Date(question?.createdAt) ===
                  new Date(question?.updatedAt) && (
                  <div onClick={handleEditable}>
                    <BiEdit className="text-blue-500" />
                  </div>
                )}
            </div>

            <div
              className={`flex relative ${
                size === "large" ? "min-h-[80px]" : "h-fit"
              } mx-1 sm:mx-3 bg-slate-200 p-2 rounded-md`}
            >
              {/* Truncate the text if it's length is greater than 60 */}
              {size === "large" ? (
                <>
                  <p
                    className="h-auto w-full outline-none break-words"
                    contentEditable={editable}
                    id="edit-question-text"
                  >
                    {questionText}
                  </p>
                </>
              ) : (
                <p className="">
                  {question?.text?.length > 120
                    ? question?.text?.slice(0, 120) + "..."
                    : question?.text}
                </p>
              )}
              <div className="absolute bottom-0 right-0">
                {attachments?.length < 5 && editable && (
                  <label
                    htmlFor="edit-question-image"
                    className="m-1 h-fit w-fit p-2 bg-gray-300 rounded-full flex items-center justify-center
                      "
                  >
                    <FaCamera className="text-blue-500 text-xs" />
                  </label>
                )}
                <input
                  type="file"
                  name="edit-question-image"
                  id="edit-question-image"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleQuestionImages}
                />
              </div>
            </div>

            <div
              className={`flex ${
                size !== "large"
                  ? "justify-end lg:justify-between"
                  : "justify-end"
              } items-center pt-2 px-1`}
            >
              {size !== "large" && (
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
                    {question?.fallnumber?.Points[0]?.name === "empty" ? "" : question?.fallnumber?.Points[0]?.name}
                  </div>
                </div>
              )}
              <div
                className={`flex items-center ${
                  size === "large" ? "justify-between" : "justify-end"
                } self-end sm:pr-2 pr-0 w-full`}
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
                              onClick={(e) => removeImgFromQuestion(e, index)}
                              className="absolute -top-2 -right-2 bg-gray-200 rounded-full text-gray-600"
                            >
                              <MdClose className="text-xs" />
                            </div>
                          )}
                        </div>
                      ))}
                    {imagesPreviewForQuestion?.length !== 0 &&
                      imagesPreviewForQuestion?.map((attachment, index) => (
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
                              onClick={(e) => removedAddedImages(e, index)}
                              className="absolute -top-2 -right-2 bg-gray-200 rounded-full text-gray-600"
                            >
                              <MdClose className="text-xs" />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex items-center">
                  {location.pathname === "/pinned-questions" && (
                    <div
                      id="pin"
                      onClick={pinQuestionAndChangeState}
                      className="text-blue-500 transform rotate-[25deg] rounded-full shadow-lg text-xl w-fit"
                    >
                      <TbPinnedFilled />
                    </div>
                  )}
                  <span className="text-xs text-gray-500 mx-1 sm:mx-3">
                    {moment(question?.createdAt).fromNow()}
                  </span>
                  {size === "large" && !editable && (
                    <Button onClick={toggleReplyBox}>
                      {showReplyBox ? "Cancel" : "Answer"}
                    </Button>
                  )}
                  {editable && (
                    <Button onClick={handleEditQuestion}>Submit</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

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
        className={`md:ml-20 md:mr-10 transition-all mt-2 ease-in-out duration-300 overflow-hidden ${
          showReplyBox ? "h-56 shadow-md" : "h-0"
        }`}
      >
        <Card
          className={`w-full h-full shadow-none ${
            size === "large" ? "flex" : "hidden"
          }`}
        >
          {showReplyBox && (
            <form onSubmit={addReply} className="p-1 flex flex-col w-full">
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
                            <img
                              className="rounded-md h-full w-full object-contain"
                              src={image}
                              alt=""
                            />
                            <div className="absolute cursor-pointer -right-2 -top-2 bg-white rounded-full flex items-center justify-center leading-3">
                              <div className="h-4 w-4 flex items-center justify-center">
                                <MdClose className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex items-center gap-3 ">
                    <div className="flex gap-5 items-center">
                      <label
                        htmlFor="avatar"
                        className="p-3 bg-white h-0 w-0 rounded-full text-blue-500 shadow-md relative"
                      >
                        <FaCamera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </label>
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-fit">
                <div className="text-red-500 text-xs">
                  {replyError ? (
                    <p className="">{replyError}</p>
                  ) : lengthError ? (
                    <p className="">{lengthError}</p>
                  ) : (
                    sizeError && <p className="">{sizeError}</p>
                  )}
                  <p>{replyError}</p>
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
