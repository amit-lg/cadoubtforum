import SectionHeading from "../components/SectionHeading";
import Question from "../components/Question";
import QuestionFilters from "../components/QuestionFilters";
import Dropdowns from "../components/Dropdowns";
import { getAskedQuestions } from "../apiCalls/question";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const AskedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [topicValue, setTopicValue] = useState("");
  const [subjectValue, setSubjectVlue] = useState("");
  const [pointsValue, setPointsValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");



  const fetchAllQuestions = async () => {
    setLoading(true);
    const response = await getAskedQuestions({subject : subjectValue , topic : topicValue , points : pointsValue});
    if (response?.status === 200) {
      setQuestions(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllQuestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[subjectValue, topicValue, pointsValue , filter]);

  return (
    <div className="fade-enter">
      <div className="flex items-center justify-between h-full">
        <SectionHeading text="Asked Questions" />
        <QuestionFilters setFilters={setFilter}/>
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

      <div className="mt-5 ">
        <div className="py-3 col-span-9 h-[95%] overflow-y-scroll">
          <div className="flex flex-col gap-5">
          {loading ? (
              <Loader />
            ) : (
              <>
                {questions?.length === 0 ? (
                  <div className="text-center h-full m-auto">No questions</div>
                ) : (
                  questions?.map((question) => (
                    <Question key={question._id} question={question} />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskedQuestions;
