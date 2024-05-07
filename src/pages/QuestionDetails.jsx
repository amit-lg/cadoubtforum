import Breadcrum from "../components/Breadcrum";
import Question from "../components/Question";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestionDetails } from "../apiCalls/question";
import { useDispatch } from "react-redux";
import {
  setShowReportModal,
  setReportData,
} from "../redux/reducers/appReducer";
import Answer from "../components/Answer";
import Loader from "../components/Loader";

const QuestionDetails = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const [question, setQuestion] = useState({});
  const [repliesAdded, setRepliesAdded] = useState([]);

  const [loading, setLoading] = useState("");

  const [showReplyBox, setShowReplyBox] = useState(false);


  const fetchQuestionDetails = async () => {
    setLoading(true);
    const response = await getQuestionDetails({ questionid: params.id });
    if (response.status === 200) {
      setQuestion(response.data);
      setLoading(false);
    }
  };


  const openReportModal = (type, id) => {
    dispatch(setShowReportModal(true));
    if (type === "question") {
      dispatch(setReportData({ questionId: id }));
    } else {
      dispatch(setReportData({ answerid: id }));
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-5 h-full w-full fade-enter">
      {loading ? (
        <Loader  />
      ) : (
        <div className="flex flex-col ">
          <div className="mb-3">
            <Breadcrum question={question} />
          </div>

          {question && (
            <Question
              question={question}
              setRepliesAdded={setRepliesAdded}
              repliesAdded={repliesAdded}
              size={"large"}
              showReplyBox={showReplyBox}
              setShowReplyBox={setShowReplyBox}
            />
          )}

          <div className="flex flex-col gap-3 pl-5">
            {question?.answers?.map((item) => {
              return (
                <Answer
                  key={item?.id}
                  item={item}
                  openReportModal={openReportModal}
                  question={question}
                  bySelf={false}
                />
              );
            })}
            {repliesAdded?.length !== 0 &&
              repliesAdded?.map((item) => (
                <Answer
                  key={item?.id}
                  item={item}
                  openReportModal={openReportModal}
                  question={question}
                  bySelf={true}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetails;
