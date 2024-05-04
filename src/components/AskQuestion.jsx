import { useState } from "react";
import Button from "../components/Button";
import PropTypes from "prop-types";
import { FaCamera } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { addQuestion, getQuestions, viewAQuestion } from "../apiCalls/question";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AskQuestionDropdowns from "./dropdowns/AskQuestionDropdown";
import {
  clearFilters,
  initState,
  setImages,
  setImagesPreview,
  setIsAsked,
  setQuestionText,
} from "../redux/reducers/askQuestionReducer";
import Loader from "./Loader";

const AskQuestion = ({ handleClose }) => {
  const navigate = useNavigate();
  const { pointsValue, questionText, isAsked, images, imagesPreview } =
    useSelector((state) => state.ask);
  const [sizeError, setSizeError] = useState("");
  const [lengthError, setLengthError] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const [pointError, setPointError] = useState(false);

  const [alreadyAsked, setAlreadyAsked] = useState(false);

  // const [images, setImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);

  const handleQuestion = (e) => {
    dispatch(setQuestionText(e.target.value));
  };

  const viewAllQuetions = () => {
    navigate("/all-questions");
    setAlreadyAsked(false);
    handleClose();
  };

  // const [images, setImages] = useState([]);
  // const [imagesPreview, setImagesPreview] = useState([]);

  const onFileChange = (event) => {
    // let files = [];
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

    dispatch(setImages(tempImages));
    dispatch(setImagesPreview(tempImagesPreview));
  };

  const removeImg = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    dispatch(setImages(newImages));

    const newImagesPreview = [...imagesPreview];
    newImagesPreview.splice(index, 1);
    dispatch(setImagesPreview(newImagesPreview));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pointsValue === "") {
      setPointError(true);
      setError("Please select a point");
      return;
    }

    if (!isAsked) {
      const responseForQuestion = await getQuestions({ points: pointsValue });
      if (responseForQuestion?.status === 200) {
        if (responseForQuestion?.data?.length > 0) {
          setAlreadyAsked(true);
          dispatch(setIsAsked(true));
          return;
        }
      }
    }

    const data = new FormData();

    data.append("questionText", questionText);
    data.append("pointerid", pointsValue);
    for (let i = 0; i < images.length; i++) {
      data.append("pictures", images[i]);
    }

    setLoading(true);
    const response = await addQuestion(data);
    if (response.status === 200) {
      handleClose();
      goToQuestion(response.data.id);
      dispatch(setIsAsked(false));
      dispatch(initState());
      dispatch(clearFilters());
    } else {
      setError(response?.msg);
    }

    setLoading(false);
  };

  const goToQuestion = async (id) => {
    const response = await viewAQuestion({ questionid: id });
    if (response.status === 200) {
      navigate(`/question/${id}`, { state: { from: "/ask-question" } });
    }
  };

  return (
    <>
      <div className="h-screen w-full">
        <div className="h-full w-full flex flex-col">
          <div className="h-full w-full flex items-center justify-center">
            <div
              className={`rounded-md transition-all duration-700 ease-in-out bg-white relative my-6 mx-auto z-50 ${
                alreadyAsked
                  ? "w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%]"
                  : "w-[90%] sm:w-[70%] md:w-[80%] lg:w-[70%] xl:w-[50%]"
              } `}
            >
              {/*content*/}
              <div
                className={`${
                  alreadyAsked ? "hidden" : "flex"
                } fade-enter border-0 shadow-lg relative flex-col w-full outline-none focus:outline-none rounded-md`}
              >
                {/*header*/}
                <div className="bg-blue-500 flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t-md">
                  <h3 className="text-xl font-semibold text-white">
                    Ask your doubt
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className=" text-white h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <MdClose />
                    </span>
                  </button>
                </div>

                {/*body*/}
                {loading ? (
                  <div className="h-[350px] w-full bg-opacity-50">
                    <Loader />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="relative p-4 flex-auto flex flex-col">
                      <div className="text-xs text-center">
                        {error && <p className="text-red-500">{error}</p>}
                      </div>
                      <AskQuestionDropdowns
                        setError={setError}
                        pointError={pointError}
                        type={"ask-question"}
                        setPointError={setPointError}
                      />

                      <div className="p-1 border flex flex-col gap-5  shadow rounded-sm">
                        <textarea
                          required
                          className="w-full border-none outline-none rouded-md p-2 resize-none"
                          rows={6}
                          value={questionText}
                          onChange={handleQuestion}
                          placeholder="Enter your doubt here"
                        />
                        <div className="px-2 relative  ">
                          <div>
                            <input
                              onChange={onFileChange}
                              type="file"
                              id="question-image"
                              className="hidden"
                              multiple
                              accept="image/*"
                            />
                            <div className="h-12 w-[150px] overflow-x-scroll sm:w-full flex items-center gap-3">
                              {imagesPreview.length > 0 &&
                                imagesPreview?.map((image, index) => (
                                  <div
                                    key={index}
                                    onClick={() => removeImg(index)}
                                  >
                                    <div className="h-10 w-10 rounded-md relative flex items-center justify-center">
                                      <img
                                        className="h-full w-full rounded-md object-contain"
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

                            <label
                              htmlFor="question-image"
                              className="shadow bg-white p-2  rounded-full text-blue-500 absolute bottom-1 right-1"
                            >
                              <FaCamera />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-blueGray-200 rounded-b">
                      <div className=" flex items-center">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={handleClose}
                        >
                          Close
                        </button>
                        <Button
                          className=" text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              <div
                className={`${
                  alreadyAsked ? "flex" : "hidden"
                } fade-enter p-5 rounded-md outline-none focus:outline-none relative my-6 mx-auto flex-col gap-4  items-center justify-center`}
              >
                <img
                  src="https://img.freepik.com/free-vector/flat-people-asking-questions-illustration_23-2148910850.jpg?t=st=1712728997~exp=1712732597~hmac=1e304cae27f97a4c938f93bf09d49812c6c0f669b8e9d87be18462abf21b1fde&w=740"
                  alt="Question already asked"
                  className="h-56 w-56 object-contain rounded-md"
                />
                <p className="text-2xl text-center">
                  Seems like this question is already asked
                </p>
                <p className="text-lg text-center">
                  If you want to see the answers click the below button
                </p>
                <Button onClick={viewAllQuetions}>See Answers</Button>
              </div>
            </div>
            <div
              onClick={handleClose}
              className="absolute opacity-25 h-full w-full inset-0 z-40 bg-black"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;

AskQuestion.propTypes = {
  handleClose: PropTypes.func,
};
