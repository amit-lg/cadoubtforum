/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { fetchSubjectTopicPoints } from "../../apiCalls/dropdowns";
import useOutsideClick from "../../hooks/usClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  setSubjects,
  setTopics,
  setPoints,
  setTopicValue,
  setTopicName,
  setPointsValue,
  setPointName,
  setSubjectName,
  setSubjectVlue,
  setIsTopicEmpty,
  setIsPointEmpty,
} from "../../redux/reducers/askQuestionReducer";
import useDidMountEffect from "../../hooks/useUpdateEffect";
// import { dropdownData } from "../mocks/dummy";

const AskQuestionDropdowns = ({
  pointError,
  setPointError,
  setError,
  type,
}) => {
  const {
    subjects,
    topics,
    points,
    subjectName,
    topicName,
    pointsName,
    subjectValue,
    topicValue,
    pointsValue,
    isTopicEmpty,
    isPointEmpty,
  } = useSelector((state) => state.ask);
  const dispatch = useDispatch();

  const fetchDropdownData = async (data) => {
    const response = await fetchSubjectTopicPoints(data);

    if (response.status === 200) {
      // check If respose.data is giiving array or object
      if (Array.isArray(response.data)) {
        let tempTopic = [];
        let tempPoint = [];
        let tempSubject = [];

        response.data?.forEach((subject) => {
          // Push subject to subjects array
          tempSubject.push({
            id: subject.id,
            name: subject.name,
          });

          // Iterate over each topic in the subject
          subject.Topics.forEach((topic) => {
            // Push topic to topics array
            tempTopic.push({
              id: topic.id,
              name: topic.name,
              subjectId: subject.id,
            });

            // Iterate over each point in the topic
            topic.points.forEach((point) => {
              // Push point to points array
              tempPoint.push({
                id: point.id,
                name: point.name,
                subjectId: subject.id,
                topicId: topic.id,
              });
            });
          });
        });

        dispatch(setSubjects([...tempSubject]));
        dispatch(setTopics([...tempTopic]));
        dispatch(setPoints([...tempPoint]));
        dispatch(setIsTopicEmpty(false));
        dispatch(setIsPointEmpty(false));
        dispatch(setTopicValue(""));
        dispatch(setTopicName(""));
        dispatch(setPointsValue(""));
        dispatch(setPointName(""));
      } else if (response.data.Topics) {
        let tempTopic = [];
        let tempPoint = [];
        // Push subject to subjects array
        dispatch(setTopicName(""));
        dispatch(setTopicValue(""));
        dispatch(setPointName(""));
        dispatch(setPointsValue(""));
        // Iterate over each topic in the subject
        response?.data?.Topics.forEach((topic) => {
          // Push topic to topics array
          tempTopic.push({
            id: topic.id,
            name: topic.name,
            // subjectId: subject.id,
          });

          // Iterate over each point in the topic
          topic.points.forEach((point) => {
            // Push point to points array
            tempPoint.push({
              id: point.id,
              name: point.name,
              //   subjectId: subject.id,
              topicId: topic.id,
            });
          });
        });

        dispatch(setTopics(tempTopic));
        dispatch(setPoints(tempPoint));
        let isEmpty = true;
        let isPointEmpty = true;
        tempTopic?.forEach((topic) => {
          if (topic.name !== "empty") {
            isEmpty = false;
          }
        });

        tempPoint?.forEach((point) => {
          if (point.name !== "empty") {
            isPointEmpty = false;
          }
        });

        console.log(tempPoint);
        console.log(tempTopic);

        if (isEmpty && isPointEmpty) {
          console.log("Both empty");
          dispatch(setPointsValue(tempPoint[0].id));
          console.log(tempPoint[0].id);
        } else {
          dispatch(setPointsValue(""));
        }

        dispatch(setPointName(""));
        dispatch(setIsTopicEmpty(isEmpty));
        dispatch(setIsPointEmpty(isPointEmpty));
      } else {
        let tempPoints = [];
        let pointEmpty = true;
        response?.data?.points.forEach((point) => {
          // Push point to points array
          tempPoints.push({
            id: point.id,
            name: point.name,
            // subjectId: subject.id,
            // topicId: topic.id,
          });

          if (point.name !== "empty") {
            pointEmpty = false;
          }
        });
        if (pointEmpty) dispatch(tempPoints[0].id);
        dispatch(setIsPointEmpty(pointEmpty));
        dispatch(setPoints(tempPoints));
        dispatch(setPointName(""));
        dispatch(setPointsValue(""));
      }
    }
  };

  useDidMountEffect(() => {
    fetchDropdownData({ topic: topicValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicValue]);

  useDidMountEffect(() => {
    fetchDropdownData({ subject: subjectValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectValue]);

  useEffect(() => {
    if (
      (subjectValue === "" || subjectValue === "empty") &&
      (topicValue === "" || topicValue === "empty") &&
      (pointsValue === "" || pointsValue === "empty")
    ) {
      fetchDropdownData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-4 w-full md:gap-4 gap-2 grid grid-cols-12 justify-between">
      <SubjectDropdown
        data={subjects}
        id={"subject-dropdown"}
        value={subjectValue}
        display={subjectName}
        setDisplay={setSubjectName}
        setValue={setSubjectVlue}
        isTopicEmpty={isTopicEmpty}
      />

      {!isTopicEmpty && (
        <TopicDropdown
          disabled={
            type === "ask-question"
              ? subjectValue === "" || subjectValue === "empty"
                ? true
                : false
              : false
          }
          data={topics}
          id={"topic-dropdown"}
          setValue={setTopicValue}
          display={topicName}
          setDisplay={setTopicName}
        />
      )}

      {!isPointEmpty && (
        <PointDropdown
          disabled={
            type === "ask-question"
              ? topicValue === "" || topicValue === "empty"
                ? true
                : false
              : false
          }
          setPointError={setPointError}
          setError={setError}
          pointError={pointError}
          name={"Los"}
          data={points}
          id={"point-dropdown"}
          value={pointsValue}
          setValue={setPointsValue}
          display={pointsName}
          setDisplay={setPointName}
          isTopicEmpty={isTopicEmpty}
        />
      )}
    </div>
  );
};

export default AskQuestionDropdowns;

AskQuestionDropdowns.propTypes = {
  type: PropTypes.string,
  subjectValue: PropTypes.string,
  setSubjectVlue: PropTypes.func,
  topicValue: PropTypes.string,
  setTopicValue: PropTypes.func,
  pointsValue: PropTypes.string,
  setPointsValue: PropTypes.func,
  pointError: PropTypes.bool,
  setPointError: PropTypes.func,
  setError: PropTypes.func,
};

export const SubjectDropdown = ({ data, id, display, isTopicEmpty }) => {
  const [showMenu, setShowMenu] = useState(false);
  const impactRef = useRef(null);

  const dispatch = useDispatch();

  const closeMenu = () => {
    setShowMenu(false);
  };

  useOutsideClick(impactRef, closeMenu);

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleDivClick = (value, name) => {
    // setValue(value);
    setShowMenu(false);
    // setDisplay(name);
    dispatch(setSubjectVlue(value));
    dispatch(setSubjectName(name));
  };
  return (
    <div
      id={id}
      ref={impactRef}
      className={`relative h-[50px] col-span-12 ${
        isTopicEmpty ? "md:col-span-6" : "md:col-span-4"
      }`}
    >
      <div
        onClick={toggleMenu}
        className="bg-blue-500 hover:bg-blue-600 flex items-center justify-between transition-all duration-300 ease-in-out cursp shadow-md select-none md:relative top-0 right-0 p-1 border w-full rounded-md h-[35px] m-auto overflow-hidden"
      >
        <span className="text-white ml-1 w-full overflow-hidden text-nowrap">
          {display ? display : "All Subjects"}
        </span>
        <div className="w-max">
          <MdArrowDropDown className="text-white" />
        </div>
      </div>

      {showMenu && (
        <div className="relative z-50 border shadow rounded bg-white w-full max-h-[300px] overflow-y-scroll">
          <div
            onClick={() => handleDivClick("", "All Subjects")}
            className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
          >
            <span className="px-1">All Subjects</span>
          </div>
          {data.map((subject, index) => (
            <div
              key={index}
              onClick={() => handleDivClick(subject?.id, subject?.name)}
              className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
            >
              {subject?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export const TopicDropdown = ({ data, id, disabled, display }) => {
  const [showMenu, setShowMenu] = useState(false);
  const impactRef = useRef(null);

  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useOutsideClick(impactRef, closeMenu);

  const handleDivClick = (value, name) => {
    dispatch(setTopicValue(value));
    dispatch(setTopicName(name));
    setShowMenu(false);
  };

  return (
    <div
      id={id}
      ref={impactRef}
      className=" relative h-[50px] col-span-12 md:col-span-4"
    >
      <div
        onClick={disabled ? null : toggleMenu}
        className="bg-blue-500 text-white text-nowrap flex items-center justify-between hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer shadow-md select-none md:relative top-0 right-0 p-1 border w-full rounded h-[35px] m-auto overflow-hidden"
      >
        <span className="text-white ml-1 w-full overflow-hidden text-nowrap">
          {display ? display : "All Topics"}
        </span>
        <div className="w-max px-1">
          <MdArrowDropDown />
        </div>
      </div>

      {showMenu && (
        <div className="relative z-50 border shadow rounded bg-white w-full max-h-[300px] overflow-y-scroll">
          <div
            onClick={() => handleDivClick("", "All Topics")}
            className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
          >
            <span className="px-1">All Topics</span>
          </div>
          {data?.map((point, index) => {
            return (
              <div key={point?.id}>
                {point?.name !== "empty" && (
                  <div
                    key={index}
                    onClick={() => handleDivClick(point?.id, point?.name)}
                    className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
                  >
                    {point?.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export const PointDropdown = ({
  data,
  id,
  disabled,
  display,
  isTopicEmpty,
  pointError,
  setPointError,
  setError,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const targetRef = useRef(null);

  useOutsideClick(targetRef, () => {
    setShowMenu(false);
  });

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
    setSearchText("");
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilteredData(data);
    }
    const filteredData = data?.filter((item) =>
      item?.name?.toLowerCase()?.includes(e.target.value?.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const handleDivClick = (value, name) => {
    dispatch(setPointsValue(value));
    dispatch(setPointName(name));
    setShowMenu(false);
    setPointError(false);
    setError("");
  };

  return (
    <div
      id={id}
      ref={targetRef}
      className={`relative h-[50px] col-span-12 ${
        isTopicEmpty ? "md:col-span-6" : "md:col-span-4"
      }`}
    >
      <div
        onClick={disabled ? null : toggleMenu}
        className={`${
          pointError ? "border-2 border-red-500" : ""
        } bg-blue-500 hover:bg-blue-600 flex items-center transition-all duration-300 ease-in-out cursor-pointer shadow-md text-white select-none md:relative top-0 right-0 p-1 border w-full rounded h-[35px] m-auto overflow-hidden`}
      >
        <span className="text-white ml-1 w-full overflow-hidden text-nowrap">
          {display ? display : "All LOS"}
        </span>
        <div className="w-max px-1">
          <MdArrowDropDown />
        </div>
      </div>

      {showMenu && (
        <div className="relative z-50 border shadow rounded bg-white w-full max-h-[300px] overflow-y-scroll">
          <div className="w-full p-1">
            <input
              value={searchText}
              onChange={handleSearchText}
              className="placeholder:text-gray text-black  rounded-md w-full p-1 outline-none border"
              type=""
              placeholder="Search"
            />
          </div>
          <div
            onClick={() => handleDivClick("", "All LOS")}
            className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
          >
            <span className="px-1">All LOS</span>
          </div>
          {filteredData?.length > 0
            ? filteredData?.map((topic, index) => (
                <div
                  key={index}
                  onClick={() => handleDivClick(topic?.id, topic?.name)}
                  className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
                >
                  <span className="px-1">{topic?.name}</span>
                </div>
              ))
            : data?.map((topic, index) => (
                <div
                  key={index}
                  onClick={() => handleDivClick(topic?.id, topic?.name)}
                  className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
                >
                  <span className="px-1">{topic?.name}</span>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

SubjectDropdown.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  display: PropTypes.string,
  setDisplay: PropTypes.func,
  isTopicEmpty: PropTypes.bool,
};
PointDropdown.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  display: PropTypes.string,
  isTopicEmpty: PropTypes.bool,
  setPoint: PropTypes.func,
  pointError: PropTypes.bool,
  disabled: PropTypes.bool,
  setPointError: PropTypes.func,
};
TopicDropdown.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  display: PropTypes.string,
};
