import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Dropdowns from "../components/Dropdowns";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import { getQuestions } from "../apiCalls/question";
import Question from "../components/Question";

const InfiniteScrollWithFilters = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [topicValue, setTopicValue] = useState("");
  const [subjectValue, setSubjectVlue] = useState("");
  const [pointsValue, setPointsValue] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  useEffect(() => {
    // Fetch data when component mounts
    hasMore && fetchData();

    // Initialize Intersection Observer
    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    // Observe the bottom of the page
    if (hasMore) {
      observer.current.observe(document.querySelector(".bottom"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [subjectValue, topicValue, pointsValue]); // Refetch data when filters change

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getQuestions({
        subject: subjectValue,
        topic: topicValue,
        points: pointsValue,
        cursor: page,
      });
      if(response.data.length < 10){
        setHasMore(false);
      }
      setData((prevData) => [...prevData, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleObserver = (entries) => {
    if (entries[0].isIntersecting && !loading) {
      fetchData();
    }
  };

  const handleSubjectValue = (value) => {
    setSubjectVlue(value);
    setPage(0); // dispatch(clearQuestions());
    // setQuestions([]);
    setData([]);
  };

  const handleTopicValue = (value) => {
    setTopicValue(value);
    setData([]);
    setPage(0);

    // setQuestions([]);
    // dispatch(clearQuestions());
  };

  const handlePointsValue = (value) => {
    setData([]);
    setPage(0);
    setPointsValue(value);
    // setQuestions([]);
    // dispatch(clearQuestions());
    // setQuestions([]);
  };

  return (
    <div>
      {/* Filter component */}
      <Dropdowns
        topicValue={topicValue}
        subjectValue={subjectValue}
        pointsValue={pointsValue}
        setTopicValue={handleTopicValue}
        setSubjectVlue={handleSubjectValue}
        setPointsValue={handlePointsValue}
      />

      {/* Render your data */}
      <div className="flex flex-col gap-20">
        {data.map((question, idx) => (
          <div
            // onClick={() => dispatch(setQuestionId(question?.id))}
            id={`question-${question?.id}`}
            key={question?.id}
          >
            <Question key={question?.id} question={question} />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Intersection Observer target */}
      {hasMore && <div className="bottom">bottom</div>}
    </div>
  );
};

export default InfiniteScrollWithFilters;
