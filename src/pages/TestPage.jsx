import SectionHeading from "../components/SectionHeading";
import Question from "../components/Question";
import QuestionFilters from "../components/QuestionFilters";
import Dropdowns from "../components/Dropdowns";
// import { getQuestions } from "../apiCalls/question";
import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import GuidedTourForAllQuestions from "../components/GuidedTourForAllQuestions";
import { getQuestions } from "../apiCalls/question";
import { useDispatch, useSelector } from "react-redux";
import {
  clearQuestions,
  incrementPage,
  initPage,
  setHasMore,
  setQuestionId,
  setQuestions,
} from "../redux/reducers/allQuestionsReducer";
import useDidMountEffect from "../hooks/useUpdateEffect";

const AllQuestions = () => {
  const { questions, questionId, page, hasMore } = useSelector((state) => state.all);
  const [topicValue, setTopicValue] = useState("");
  const [subjectValue, setSubjectVlue] = useState("");
  const [pointsValue, setPointsValue] = useState("");
  const [loading, setLoading] = useState("");

  const [filter, setFilter] = useState("");
  // const [hasMore, setHasMore] = useState(false);

  const observerTarget = useRef(null);

  const dispatch = useDispatch();

  const handleQuestionId = (id) => {
    dispatch(setQuestionId(id));
  };

  const fetchAllQuestions = useCallback(async (page) => {
    const response = await getQuestions({
      subject: subjectValue,
      topic: topicValue,
      points: pointsValue,
      cursor: page,
      filter: filter,
    });

    if (response?.status === 200) {
      dispatch(incrementPage());
      // setQuestions((prev) => {
      const newData = [...response.data];
      dispatch(setQuestions(newData));
      if (response.data.length < 10) {
        dispatch(setHasMore(false));
      } else {
        dispatch(setHasMore(true));
      }
      // });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsValue, subjectValue, topicValue, filter, dispatch]);

  useEffect(() => {
    const ref = observerTarget.current;
    const currentPage = page;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchAllQuestions(currentPage);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  });

  useDidMountEffect(() => {
    // if(subjectValue || topicValue || pointsValue){
    dispatch(initPage());
    dispatch(clearQuestions());
    dispatch(setHasMore(true))
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectValue, topicValue, pointsValue , filter]);

  useEffect(() => {
    if (page === 0 && questions?.length === 0) {
      setLoading(true);
      fetchAllQuestions();
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (questionId) {
      // Scroll to the question with the given id
      const questionElement = document.getElementById(questionId);
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: "instant" });
      }
    }
  }, [questionId]);

  return (
    <div className="fade-enter">
      <GuidedTourForAllQuestions />

      <div className="flex items-center justify-between h-full">
        <SectionHeading text="All Questions" />
        <QuestionFilters setFilters={setFilter} />
      </div>

      <div className="mt-4 w-full">
        <Dropdowns
          topicValue={topicValue}
          subjectValue={subjectValue}
          pointsValue={pointsValue}
          setTopicValue={setTopicValue}
          setSubjectVlue={setSubjectVlue}
          setPointsValue={setPointsValue}
        />
      </div>

      <div id="all-question-list" className="mt-5 ">
        <div className="py-3 col-span-9 h-[95%] overflow-y-scroll">
          <div className="flex flex-col gap-5">
            {loading ? <Loader /> : null}
            <>
              {questions?.length === 0 ? (
                <div
                  className={`${hasMore ? "hidden" : "flex"
                    } text-center h-full m-auto`}
                >
                  No questions
                </div>
              ) : (
                questions?.map((question, idx) => (
                  <div
                    id={"question" + question.id}
                    onClick={() => handleQuestionId("question" + question.id)}
                    key={idx}
                  >
                    <Question key={question._id} question={question} />
                  </div>
                ))
              )}
            </>
          </div>
          {hasMore ? (
            <div ref={observerTarget}>
              <Loader />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
