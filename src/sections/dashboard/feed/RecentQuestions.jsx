import Loader from "../../../components/Loader";
import Question from "../../../components/Question";
import SectionHeading from "../../../components/SectionHeading";
import PropTypes from "prop-types";

const RecentQuestions = ({ questions, loading }) => {
  return (
    <div>
      <div className="h-[65vh]">
        <SectionHeading text="Recent Questions" />
        <div className="mt-5 py-3 h-full flex flex-col gap-5 overflow-y-scroll scrollbar-none">
          {loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader />
            </div>
          ) : questions?.length === 0 ? (
            <div className="text-center flex items-center justify-center h-full w-full">
              No Questions yet
            </div>
          ) : (
            questions?.map((question) => (
              <Question key={question._id} question={question} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentQuestions;

RecentQuestions.propTypes = {
  questions: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
