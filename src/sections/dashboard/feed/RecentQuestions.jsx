import Loader from "../../../components/Loader";
import Question from "../../../components/Question";
import SectionHeading from "../../../components/SectionHeading";
import PropTypes from "prop-types";
// import Card from "../../../components/ui/Card";

const RecentQuestions = ({ questions, loading }) => {
  return (
    <div>
      <div className="h-[400px] w-full rounded-md p-2 ">
        <SectionHeading text="Recently Asked" />

        <div className="mt-3 gap-8 pr-2 pb-3 h-[calc(100%-28px)] flex flex-col overflow-y-scroll scrollbar-none">
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
