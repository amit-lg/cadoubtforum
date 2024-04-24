import PropTypes from "prop-types";
import { MdArrowRight } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  setTopicValue as setAllQuestionTopicValue,
  setSubjectVlue as setAllQuestionSubjectValue,
  setPointsValue as setAllQuestionPointsValue,
  setPointName as setAllQuestionPointName,
  setSubjectName as setAllQuestionSubjectName,
  setTopicName as setAllQuestionTopicName,
  clearFilters as clearAllQuestionFilters,
} from "../redux/reducers/allQuestionsReducer";
import {
  setTopicValue as setAskedQuestionTopicValue,
  setSubjectVlue as setAskedQuestionSubjectValue,
  setPointsValue as setAskedQuestionPointsValue,
  setPointName as setAskedQuestionPointName,
  setSubjectName as setAskedQuestionSubjectName,
  setTopicName as setAskedQuestionTopicName,
  clearFilters as clearAskedQuestionFilters,
} from "../redux/reducers/askedQuestionsReducer";
import {
  setTopicValue as setPinnedQuestionTopicValue,
  setSubjectVlue as setPinnedQuestionSubjectValue,
  setPointsValue as setPinnedQuestionPointsValue,
  setPointName as setPinnedQuestionPointName,
  setSubjectName as setPinnedQuestionSubjectName,
  setTopicName as setPinnedQuestionTopicName,
  clearFilters as clearPinnedQuestionFilters,
} from "../redux/reducers/pinnedQuestionsReducer";
import {
  setTopicValue as setUnansweredQuestionTopicValue,
  setSubjectVlue as setUnansweredQuestionSubjectValue,
  setPointsValue as setUnansweredQuestionPointsValue,
  setPointName as setUnansweredQuestionPointName,
  setSubjectName as setUnansweredQuestionSubjectName,
  setTopicName as setUnansweredQuestionTopicName,
  clearFilters as clearUnansweredQuestionFilters,
} from "../redux/reducers/unansweredQuestionsReducer";

const Breadcrum = ({ question }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location);

  const handleNavigate = () => {
    if (location.state.from === "/ask-question") {
      navigate("/all-questions");
    } else {
      navigate(location.state.from);
    }
  };

  const topicClicked = (data) => {
    if (
      location.state.from === "/all-questions" ||
      location.state.from === "/ask-question"
    ) {
      dispatch(clearAllQuestionFilters());
      dispatch(setAllQuestionTopicValue(data?.topic?.id));
      dispatch(setAllQuestionTopicName(data?.topic?.name));
      dispatch(setAllQuestionSubjectValue(data?.subject?.id));
      dispatch(setAllQuestionSubjectName(data?.subject?.name));
    } else if (location.state.from === "/asked-questions") {
      dispatch(clearAskedQuestionFilters());
      dispatch(setAskedQuestionTopicValue(data?.topic?.id));
      dispatch(setAskedQuestionTopicName(data?.topic?.name));
      dispatch(setAskedQuestionSubjectValue(data?.subject?.id));
      dispatch(setAskedQuestionSubjectName(data?.subject?.name));
    } else if (location.state.from === "/pinned-questions") {
      dispatch(clearPinnedQuestionFilters());
      dispatch(setPinnedQuestionTopicValue(data?.topic?.id));
      dispatch(setPinnedQuestionTopicName(data?.topic?.name));
      dispatch(setPinnedQuestionSubjectValue(data?.subject?.id));
      dispatch(setPinnedQuestionSubjectName(data?.subject?.name));
    } else if (location.state.from === "/unanswered-questions") {
      dispatch(clearUnansweredQuestionFilters());
      dispatch(setUnansweredQuestionTopicValue(data?.topic?.id));
      dispatch(setUnansweredQuestionTopicName(data?.topic?.name));
      dispatch(setUnansweredQuestionSubjectValue(data?.subject?.id));
      dispatch(setUnansweredQuestionSubjectName(data?.subject?.name));
    }
    handleNavigate();
  };

  const subjectClicked = (data) => {
    if (
      location.state.from === "/all-questions" ||
      location.state.from === "/ask-question"
    ) {
      dispatch(clearAllQuestionFilters());
      dispatch(setAllQuestionSubjectValue(data.subject?.id));
      dispatch(setAllQuestionSubjectName(data.subject?.name));
      dispatch(setAllQuestionTopicValue(""));
      dispatch(setAllQuestionPointsValue(""));
      dispatch(setAllQuestionPointName(""));
      dispatch(setAllQuestionTopicName(""));
    } else if (location.state.from === "/asked-questions") {
      dispatch(clearAskedQuestionFilters());
      dispatch(setAskedQuestionSubjectValue(data.subject?.id));
      dispatch(setAskedQuestionSubjectName(data.subject?.name));
      dispatch(setAskedQuestionTopicValue(""));
      dispatch(setAskedQuestionPointsValue(""));
      dispatch(setAskedQuestionPointName(""));
      dispatch(setAskedQuestionTopicName(""));
    } else if (location.state.from === "/pinned-questions") {
      dispatch(clearPinnedQuestionFilters());
      dispatch(setPinnedQuestionSubjectValue(data.subject?.id));
      dispatch(setPinnedQuestionSubjectName(data.subject?.name));
      dispatch(setPinnedQuestionTopicValue(""));
      dispatch(setPinnedQuestionPointsValue(""));
      dispatch(setPinnedQuestionPointName(""));
      dispatch(setPinnedQuestionTopicName(""));
    } else if (location.state.from === "/unanswered-questions") {
      dispatch(clearUnansweredQuestionFilters());
      dispatch(setUnansweredQuestionSubjectValue(data.subject?.id));
      dispatch(setUnansweredQuestionSubjectName(data.subject?.name));
      dispatch(setUnansweredQuestionTopicValue(""));
      dispatch(setUnansweredQuestionPointsValue(""));
      dispatch(setUnansweredQuestionPointName(""));
      dispatch(setUnansweredQuestionTopicName(""));
    }
    handleNavigate();
  };

  const pointClicked = (data) => {
    if (
      location.state.from === "/all-questions" ||
      location.state.from === "/ask-question"
    ) {
      dispatch(clearAllQuestionFilters());
      dispatch(setAllQuestionSubjectValue(data.subject?.id));
      dispatch(setAllQuestionSubjectName(data.subject?.name));
      dispatch(setAllQuestionTopicValue(data?.topic?.id));
      dispatch(setAllQuestionPointsValue(data?.point?.id));
      dispatch(setAllQuestionPointName(data?.point?.name));
      dispatch(setAllQuestionTopicName(data?.topic?.name));
    } else if (location.state.from === "/asked-questions") {
      dispatch(clearAskedQuestionFilters());
      dispatch(setAskedQuestionSubjectValue(data.subject?.id));
      dispatch(setAskedQuestionSubjectName(data.subject?.name));
      dispatch(setAskedQuestionTopicValue(data?.topic?.id));
      dispatch(setAskedQuestionPointsValue(data?.point?.id));
      dispatch(setAskedQuestionPointName(data?.point?.name));
      dispatch(setAskedQuestionTopicName(data?.topic?.name));
    } else if (location.state.from === "/pinned-questions") {
      dispatch(clearPinnedQuestionFilters());
      dispatch(setPinnedQuestionSubjectValue(data.subject?.id));
      dispatch(setPinnedQuestionSubjectName(data.subject?.name));
      dispatch(setPinnedQuestionTopicValue(data?.topic?.id));
      dispatch(setPinnedQuestionPointsValue(data?.point?.id));
      dispatch(setPinnedQuestionPointName(data?.point?.name));
      dispatch(setPinnedQuestionTopicName(data?.topic?.name));
    } else if (location.state.from === "/unanswered-questions") {
      dispatch(clearUnansweredQuestionFilters());
      dispatch(setUnansweredQuestionSubjectValue(data.subject?.id));
      dispatch(setUnansweredQuestionSubjectName(data.subject?.name));
      dispatch(setUnansweredQuestionTopicValue(data?.topic?.id));
      dispatch(setUnansweredQuestionPointsValue(data?.point?.id));
      dispatch(setUnansweredQuestionPointName(data?.point?.name));
      dispatch(setUnansweredQuestionTopicName(data?.topic?.name));
    }
    handleNavigate();
  };

  return (
    <nav className="flex overflow-x-scroll" aria-label="Breadcrumb">
      <ol className="pl-3 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm md:text-base">
        <li
          onClick={() =>
            subjectClicked({
              subject: {
                name: question?.fallnumber?.Points[0]?.topics?.Subjects?.name,
                id: question?.fallnumber?.Points[0]?.topics?.Subjects?.id,
              },
            })
          }
          className="hover:text-blue-500 inline-flex items-center text-nowrap cursor-pointer"
        >
          {question?.fallnumber?.Points[0]?.topics?.Subjects?.name}
        </li>
        <li
          onClick={() =>
            topicClicked({
              subject: {
                name: question?.fallnumber?.Points[0]?.topics?.Subjects?.name,
                id: question?.fallnumber?.Points[0]?.topics?.Subjects?.id,
              },
              topic: {
                name: question?.fallnumber?.Points[0]?.topics?.name,
                id: question?.fallnumber?.Points[0]?.topics?.id,
              },
            })
          }
          className="hover:text-blue-500 flex items-center gap-2 text-nowrap cursor-pointer"
        >
          {question?.fallnumber?.Points[0]?.topics?.name !== "empty" && (
            <MdArrowRight />
          )}
          {question?.fallnumber?.Points[0]?.topics?.name === "empty"
            ? ""
            : question?.fallnumber?.Points[0]?.topics?.name}
        </li>

        <li
          onClick={() =>
            pointClicked({
              subject: {
                name: question?.fallnumber?.Points[0]?.topics?.Subjects?.name,
                id: question?.fallnumber?.Points[0]?.topics?.Subjects?.id,
              },
              topic: {
                name: question?.fallnumber?.Points[0]?.topics?.name,
                id: question?.fallnumber?.Points[0]?.topics?.id,
              },
              point: {
                name: question?.fallnumber?.Points[0]?.name,
                id: question?.fallnumber?.Points[0]?.id,
              },
            })
          }
          className="hover:text-blue-500 flex items-center gap-2 text-nowrap cursor-pointer"
        >
          <MdArrowRight />
          {question?.fallnumber?.Points[0]?.name}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrum;

Breadcrum.propTypes = {
  question: PropTypes.object,
};
