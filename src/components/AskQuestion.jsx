import { useState } from "react";
import Button from "../components/Button";
import PropTypes from "prop-types";
import { FaCamera } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { addQuestion, getQuestions, viewAQuestion } from "../apiCalls/question";
import { useNavigate } from "react-router-dom";
import AllQuestionDropdowns from "../components/dropdowns/AllQuestionDropdown";
import { useSelector } from "react-redux";

const AskQuestion = ({ handleClose }) => {
  const navigate = useNavigate();
  const { pointsValue } = useSelector((state) => state.all);

  const [question, setQuestion] = useState("");

  const [sizeError, setSizeError] = useState("");
  const [lengthError, setLengthError] = useState([]);

  const [pointError, setPointError] = useState(false);

  const [alreadyAsked, setAlreadyAsked] = useState(false);

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const viewAllQuetions = () => {
    navigate("/all-questions");
    setAlreadyAsked(false);
    handleClose();
  };



  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const onFileChange = (event) => {
    if (!event.target.files) return;
    let files = event?.target?.files;

    if (files.length > 5 - images.length) {
      files = files.slice(0, 5 - images.length);
      setLengthError("You can only upload a maximum of 5 images");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      if (element.size > 2097152) {
        setSizeError("File size should not be greater than 2MB");
        continue;
      }
      setImages([...images, element]);
      setImagesPreview([...imagesPreview, URL.createObjectURL(element)]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pointsValue === "") {
      setPointError(true);
      return;
    }

    const responseForQuestion = await getQuestions({ points: pointsValue, });
    if (responseForQuestion?.status === 200) {
      if (responseForQuestion?.data?.length > 0) {
        setAlreadyAsked(true);
        return;
      }
    }

    const data = new FormData();

    data.append("questionText", question);
    data.append("pointerid", pointsValue);
    for (let i = 0; i < images.length; i++) {
      data.append("pictures", images[i]);
    }

    console.log(data);

    const response = await addQuestion(data);
    if (response.status === 200) {
      handleClose();
      goToQuestion(response.data.id);
    }
  };

  const goToQuestion = async (id) => {
    const response = await viewAQuestion({ questionid: id });
    if (response.status === 200) {
      navigate(`/question/${id}` , {state : {from : "/ask-question"}});
    }
  };

  return (
    <>
      <div className="h-screen w-full">
        <div className="h-full w-full flex flex-col">
          <div className="h-full w-full flex items-center justify-center">
            <div
              className={`rounded-md transition-all duration-700 ease-in-out bg-white relative my-6 mx-auto z-50 ${alreadyAsked
                ? "w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%]"
                : "w-[90%] sm:w-[70%] md:w-[80%] lg:w-[70%] xl:w-[50%]"
                } `}
            >
              {/*content*/}
              <div
                className={`${alreadyAsked ? "hidden" : "flex"
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
                <form onSubmit={handleSubmit}>
                  <div className="relative p-4 flex-auto flex flex-col">
                    <AllQuestionDropdowns
                      pointError={pointError}
                      type={"ask-question"}
                    />

                    <div className="p-1 border flex flex-col gap-5 bg-slate-50 shadow rounded-sm">
                      <textarea
                        required
                        className="w-full border-none outline-none rouded-md p-2 resize-none"
                        rows={6}
                        value={question}
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
                          <div className="h-12 w-full flex items-center gap-3">
                            {imagesPreview.length > 0 &&
                              imagesPreview?.map((image, index) => (
                                <div
                                  key={index}
                                  onClick={() => removeImg(index)}
                                >
                                  <div className="h-10 w-10 rounded-md relative flex items-center justify-center">
                                    <img
                                      className="rounded-md"
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
                  <div className="flex items-center justify-between px-6 py-2 border-t border-solid border-blueGray-200 rounded-b">
                    <div>
                      {pointError ? (
                        <div className="text-red-500">
                          Please select a point
                        </div>
                      ) : (
                        <>
                          {sizeError && (
                            <div className="text-red-500">{sizeError}</div>
                          )}
                          {lengthError && (
                            <div className="text-red-500">{lengthError}</div>
                          )}
                        </>
                      )}
                    </div>
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
              </div>

              <div
                className={`${alreadyAsked ? "flex" : "hidden"
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
                <Button onClick={viewAllQuetions}>
                  See Answers
                </Button>
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
