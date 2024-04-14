import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { fetchSubjectTopicPoints } from "../apiCalls/dropdowns";
// import { dropdownData } from "../mocks/dummy";

const Dropdowns = ({
  subjectValue,
  topicValue,
  pointsValue,
  setSubjectVlue,
  setTopicValue,
  setPointsValue,
  pointError,
}) => {
  const [topic, setTopic] = useState([]);
  const [subject, setSubject] = useState([]);
  const [points, setPoints] = useState([]);

  const [subjectName, setSubjectName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [pointsName, setPointsName] = useState("");

  // const [topicValue, setTopicValue] = useState("");
  // const [subjectValue, setSubjectVlue] = useState("");
  // const [pointsValue, setPointsValue] = useState("");

  const [isTopicEmpty, setIsTopicEmpty] = useState(false);

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

        setSubject(tempSubject);
        setTopic(tempTopic);
        setPoints(tempPoint);
        setIsTopicEmpty(false);
        setTopicValue("");
        setTopicName("");
        setPointsValue("");
        setPointsName("");
      } else if (response.data.Topics) {
        let tempTopic = [];
        let tempPoint = [];
        // Push subject to subjects array
        setTopicName("");
        setTopicValue("");
        setPointsName("");
        setPointsValue("");
        // Iterate over each topic in the subject
        response?.data?.Topics.forEach((topic) => {
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

        setTopic(tempTopic);
        setPoints(tempPoint);
        let isEmpty = true;
        tempTopic?.forEach((topic) => {
          if (topic.name !== "empty") {
            isEmpty = false;
          }
        });
        setIsTopicEmpty(isEmpty);
        setPointsName("");
        setPointsValue("");
      } else {
        let tempPoints = [];
        response?.data?.points.forEach((point) => {
          // Push point to points array
          tempPoints.push({
            id: point.id,
            name: point.name,
            subjectId: subject.id,
            topicId: topic.id,
          });
        });
        setPoints(tempPoints);
        setPointsName("");
        setPointsValue("");
      }
    }
  };

  useEffect(() => {
    fetchDropdownData({ topic: topicValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicValue]);

  useEffect(() => {
    fetchDropdownData({ subject: subjectValue });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectValue]);

  return (
    <div className="mt-4 w-full gap-5 grid grid-cols-12 justify-between">
      <SubjectDropdown
        name={"Subject"}
        data={subject}
        id={"subject"}
        value={subjectValue}
        display={subjectName}
        setDisplay={setSubjectName}
        setValue={setSubjectVlue}
        isTopicEmpty={isTopicEmpty}
      />

      {!isTopicEmpty && (
        <TopicDropdown
          name={"Topic"}
          data={topic}
          id={"topic"}
          value={topicValue}
          setValue={setTopicValue}
          display={topicName}
          setDisplay={setTopicName}
        />
      )}

      <PointDropdown
        pointError={pointError}
        name={"Los"}
        data={points}
        id={"los"}
        value={pointsValue}
        setValue={setPointsValue}
        display={pointsName}
        setDisplay={setPointsName}
        isTopicEmpty={isTopicEmpty}
      />
    </div>
  );
};

export default Dropdowns;

Dropdowns.propTypes = {
  type: PropTypes.string,
  subjectValue: PropTypes.string,
  setSubjectVlue: PropTypes.func,
  topicValue: PropTypes.string,
  setTopicValue: PropTypes.func,
  pointsValue: PropTypes.string,
  setPointsValue: PropTypes.func,
  pointError: PropTypes.bool,
};

export const SubjectDropdown = ({
  data,
  id,
  name,
  value,
  setValue,
  display,
  setDisplay,
  isTopicEmpty,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

  const handleDivClick = (value, name) => {
    setValue(value);
    setShowMenu(false);
    setDisplay(name);
  };
  return (
    <div
      className={`relative h-[50px] col-span-12 ${
        isTopicEmpty ? "md:col-span-6" : "md:col-span-4"
      }`}
    >
      <div className="relative sm:hidden w-full flex items-center justify-center">
        <select
          className=" w-full bg-gray-200 border border-gray-100 hover:border-gray-200 px-1 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleSelectChange}
          id={id}
          name={name}
          value={value}
          // defaultValue={"All"}
        >
          <option value="">All Subjects</option>
          {data?.map((subject, index) => {
            return (
              <option key={index} value={subject?.id}>
                {subject?.name}
              </option>
            );
          })}
          {/* Add more options as needed */}
        </select>
      </div>

      <div
        onClick={toggleMenu}
        className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out cursp shadow-md select-none hidden sm:block md:relative top-0 right-0 p-1 border w-full rounded-md h-[35px] m-auto overflow-hidden"
      >
        <div className="w-full absolute md:left-[92%] left-[96%] top-2 flex px-1">
          <MdArrowDropDown className="text-white" />
        </div>
        <span className="text-white ml-1">
          {display ? display : "All Subjects"}
        </span>
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
export const TopicDropdown = ({
  data,
  id,
  name,
  value,
  setValue,
  display,
  setDisplay,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

  const handleDivClick = (value, name) => {
    setValue(value);
    setDisplay(name);
    setShowMenu(false);
  };
  return (
    <div className=" relative h-[50px] col-span-12 md:col-span-4">
      <div className="relative sm:hidden w-full flex items-center justify-center">
        <select
          className=" w-full bg-gray-200 border border-gray-100 hover:border-gray-200 px-1 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleSelectChange}
          id={id}
          name={name}
          value={value}
        >
          <option value="">All Topics</option>
          {data?.map((point, index) => {
            return (
              <Fragment key={index}>
                {point?.name !== "empty" && (
                  <option key={index} value={point?.id}>
                    {point?.name}
                  </option>
                )}
              </Fragment>
            );
          })}
          {/* Add more options as needed */}
        </select>
      </div>

      <div
        onClick={toggleMenu}
        className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer shadow-md select-none hidden sm:block md:relative top-0 right-0 p-1 border w-full rounded h-[35px] m-auto overflow-hidden"
      >
        <div className="w-full absolute md:left-[92%] left-[96%] top-2 flex px-1">
          <MdArrowDropDown />
        </div>
        <span className="px-1">{display ? display : "All Topics"}</span>
      </div>

      {showMenu && (
        <div className="relative z-50 border shadow rounded bg-white w-full max-h-[300px] overflow-y-scroll">
          <div
            onClick={() => handleDivClick("", "All Topics")}
            className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
          >
            <span className="px-1">All Points</span>
          </div>
          {data?.map((point, index) => {
            return (
              <>
                {point?.name !== "empty" && (
                  <div
                    key={index}
                    onClick={() => handleDivClick(point?.id, point?.name)}
                    className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
                  >
                    {point?.name}
                  </div>
                )}
              </>
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
  name,
  value,
  setValue,
  display,
  setDisplay,
  isTopicEmpty,
  setPoint,
  pointError,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const toggleMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleSelectChange = (e) => {
    setValue(e.target.value);
  };

  const handleDivClick = (value, name) => {
    setValue(value);
    setDisplay(name);
    setShowMenu(false);
    setPoint(value);
  };

  const handleInputChange = (e) => {
    setShowMenu(true);
    setDisplay(e.target.value);
    //  filter the data based on the input value
    if (e.target.value === "") {
      setFilteredData(data);
    }
    const filteredData = data?.filter((item) =>
      item?.name?.toLowerCase()?.includes(e.target.value?.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  return (
    <div
      className={`relative h-[50px] col-span-12 ${
        isTopicEmpty ? "md:col-span-6" : "md:col-span-4"
      }`}
    >
      <div className="relative sm:hidden w-full flex items-center justify-center">
        <select
          className=" w-full bg-gray-200 border border-gray-100 hover:border-gray-200 px-1 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleSelectChange}
          id={id}
          name={name}
          value={value}
        >
          <option value="">All Points</option>
          {data?.map((topic, index) => {
            return (
              <option key={index} value={topic?.id}>
                {topic?.name || "All Points"}
              </option>
            );
          })}
          {/* Add more options as needed */}
        </select>
      </div>

      {/* <div
        onClick={toggleMenu}
        className={`${
          pointError ? "border-2 border-red-500" : ""
        } bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer shadow-md text-white select-none hidden sm:block md:relative top-0 right-0 p-1 border w-full rounded h-[35px] m-auto overflow-hidden`}
      >
        <div className="w-full absolute md:left-[92%] left-[96%] top-2 flex px-1">
          <MdArrowDropDown />
        </div>
        {display ? display : "All LOS"}
      </div> */}

      <div className="bg-blue-500 rounded flex items-center">
        <input
          value={display}
          onClick={toggleMenu}
          onChange={handleInputChange}
          className="placeholder:text-white bg-blue-500 text-white  rounded-md w-full p-1 outline-none border-none"
          type=""
          placeholder="All Points"
        />
        <MdArrowDropDown className="text-white" />
      </div>

      {showMenu && (
        <div className="relative z-50 border shadow rounded bg-white w-full max-h-[300px] overflow-y-scroll">
          <div
            onClick={() => handleDivClick("", "All Points")}
            className="p-2 hover:bg-gray-100 cursor-pointer select-none h-[70%]"
          >
            <span className="px-1">All Points</span>
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
  name: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  display: PropTypes.string,
  setDisplay: PropTypes.func,
  isTopicEmpty: PropTypes.bool,
  setPoint: PropTypes.func,
  pointError: PropTypes.bool,
};
TopicDropdown.propTypes = {
  data: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func,
  display: PropTypes.string,
  setDisplay: PropTypes.func,
};