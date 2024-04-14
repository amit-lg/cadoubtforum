import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestions } from "../apiCalls/question";
import Card from "../components/ui/Card";
import {
  setHasMore,
  setQuestionId,
  setQuestions,
} from "../redux/reducers/testReducer";
import { Link } from "react-router-dom";
import Dropdowns from "../components/Dropdowns";

const TestPage = () => {
  const observerTarget = useRef(null);
  const dispatch = useDispatch();
  const { questions, questionId } = useSelector((state) => state.test);

  // const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [topicValue, setTopicValue] = useState("");
  const [subjectValue, setSubjectVlue] = useState("");
  const [pointsValue, setPointsValue] = useState("");
  const [filter, setFilter] = useState("");

  const [hasMore, setHasMore] = useState(true);
  let page = 0;

  const fetchAllQuestions = async () => {
    setLoading(true);
    const response = await getQuestions({
      subject: "",
      topic: "",
      points: "",
      filter: "",
      cursor: page,
    });
    if (response.status === 200) {
      if (response?.data?.length === 0 || response?.data?.length < 8) {
        // dispatch(setHasMore(false));
        setHasMore(false);
      }
      dispatch(setQuestions(response.data));
      setLoading(false);
    }
    page++;
  };

  const handleTopicValue = (value) => {
    // dispatch(setHasMore(true));
    setHasMore(true);
    page = 0;
    setTopicValue(value);

    dispatch(setQuestions([]));
  };

  const handleSubjectValue = (value) => {
    // dispatch(setHasMore(true));
    setHasMore(true);
    page = 0;
    setSubjectVlue(value);

    dispatch(setQuestions([]));
  };

  const handlePointsValue = (value) => {
    // dispatch(setHasMore(true));
    setHasMore(true);
    page = 0;
    setPointsValue(value);

    dispatch(setQuestions([]));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchAllQuestions();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerTarget.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerTarget, subjectValue, topicValue, pointsValue]);

  useEffect(() => {
    if (questionId === "") {
      return;
    }
    const target = document.getElementById(questionId);
    target.scrollIntoView(true);
  }, [questionId]);

  return (
    <div>
      <div className="mt-4 w-full">
        <Dropdowns
          topicValue={topicValue}
          subjectValue={subjectValue}
          pointsValue={pointsValue}
          setTopicValue={handleTopicValue}
          setSubjectVlue={handleSubjectValue}
          setPointsValue={handlePointsValue}
        />
      </div>
      <div className="h-auto w-full flex items-center justify-center  flex-col gap-10">
        {questions.map((question, idx) => {
          return (
            <Link
              onClick={() =>
                dispatch(setQuestionId(`question-${question?.id}`))
              }
              id={`question-${question?.id}`}
              to={`/question/${idx}`}
              className="w-full flex flex-col"
              key={idx}
            >
              <Card>
                <Card className="h-[100px] shadow-none flex items-center justify-center agp-3">
                  <div>Question {idx}</div>
                </Card>
              </Card>
            </Link>
          );
        })}
        {loading && <p>Loading...</p>}
        {hasMore && (
          <div className="bg-red-500 h-[10px]" ref={observerTarget}>
            lOAD DATA
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
