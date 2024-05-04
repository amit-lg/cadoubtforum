import SectionHeading from "../components/SectionHeading";
import Question from "../components/Question";
import QuestionFilters from "../components/QuestionFilters";
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
import AllQuestionDropdowns from "../components/dropdowns/AllQuestionDropdown";
import { openAskQuestion } from "../redux/reducers/appReducer";
import axios from "axios";
const TestPage2 = () => {
  const {
    questions,
    questionId,
    page,
    hasMore,
    topicValue,
    subjectValue,
    pointsValue,
  } = useSelector((state) => state.all);
  const { searchText } = useSelector((state) => state.app);
  const { isAsked } = useSelector((state) => state.ask);
  const [loading, setLoading] = useState("");

  const [filter, setFilter] = useState("");

  const observerTarget = useRef(null);

  const dispatch = useDispatch();

  const openAskedQuestionPopup = () => {
    dispatch(openAskQuestion());
  };

  const handleQuestionId = (id) => {
    dispatch(setQuestionId(id));
  };

  const fetchAllQuestions = useCallback(
    async (page , cancelToken) => {
      const response = await getQuestions({
        subject: subjectValue,
        topic: topicValue,
        points: pointsValue,
        cursor: page ? page : 0,
        filter: filter,
        searchText,
        cancelToken: cancelToken ? cancelToken : "",
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
    },
    [pointsValue, subjectValue, topicValue, filter, searchText, dispatch]
  );

  useEffect(() => {
    const ref = observerTarget.current;
    const currentPage = page;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchAllQuestions(currentPage , source.token);
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
        source.cancel();
      }
    };
  }, [
    page,
    subjectValue,
    topicValue,
    pointsValue,
    filter,
    searchText,
    fetchAllQuestions,
  ]);

  useDidMountEffect(() => {
    dispatch(initPage());
    dispatch(clearQuestions());
    dispatch(setHasMore(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectValue, topicValue, pointsValue, filter, searchText]);

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
        <QuestionFilters filter={filter} setFilters={setFilter} />
      </div>

      <div className="mt-4 w-full">
        <AllQuestionDropdowns
          topicValue={topicValue}
          subjectValue={subjectValue}
          pointsValue={pointsValue}
        />
      </div>

      {isAsked && (
        <div
          onClick={openAskedQuestionPopup}
          className="w-full flex items-center justify-end px-3 mt-2 tracking-wide text-blue-500"
        >
          <span className="text-right text-sm">
            Didn&apos;t find the answer?
          </span>
        </div>
      )}

      <div id="all-question-list" className="mt-3">
        <div className="py-3 col-span-9 h-[95%] overflow-y-scroll">
          <div className="flex flex-col">
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

export default TestPage2;
