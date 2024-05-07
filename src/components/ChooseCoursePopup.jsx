import { closeChhoseCoursePopup } from "../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md";
import { enrollCourse, getCourses } from "../apiCalls/courses";
import { loginSuccess } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const ChooseCoursePopup = () => {
  const [error, setError] = useState("");
  const [courseLevels, setCoursesLevels] = useState([]);
  const [batch, setBatch] = useState("");

  const { tempToken } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batch) {
      setError("Please select a batch");
      return;
    }

    const data = {
      batchID  : batch,
      token : tempToken,
    };

    const response = await enrollCourse(data);
    if (response.status === 200) {
      dispatch(closeChhoseCoursePopup());
      dispatch(loginSuccess(response.data));
      navigate("/dashboard");
    }
  };

  const handleClose = () => {
    dispatch(closeChhoseCoursePopup());
  };

  const fetchCourses = async () => {
    const response = await getCourses();
    if (response.status === 200) {
      setCoursesLevels(response.data.Level);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex items-center justify-center">
        <div className="bg-white relative h-fit md:h-fit my-6 mx-auto z-50 w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[30%] rounded-md space-y-3">
          <div
            onClick={handleClose}
            className="absolute top-0 right-0 p-2 cursor-pointer"
          >
            <MdClose />
          </div>

          <div className="p-4 space-y-3">
            <h3 className="text-xl font-semibold">Choose a course</h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-3 flex flex-col"
              action=""
            >
              <select
                onChange={(e) => setBatch(e.target.value)}
                defaultValue={batch}
                required
                className={`
             p-2 bg-gray-100 w-full rounded-md  text-sm outline-none relative z-20 shadow-md
            ${batch === "" ? "text-gray-400" : "text-black"}
          `}
              >
                <option value="" disabled className="text-gray-400">
                  Select your level
                </option>
                {courseLevels?.map((level) => {
                  return (
                    <Fragment key={level?.id}>
                      {level?.Batches?.map((batch) => {
                        return (
                          <option
                            key={batch?.id}
                            value={batch?.id}
                            className="text-black"
                          >
                            {level?.Name + " - " + batch?.Name}
                          </option>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </select>

              <div className="h-2 flex items-center justify my-2">{error}</div>

              <Button className="w-max self-end" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div
        onClick={handleClose}
        className="opacity-25 absolute h-full w-full inset-0 z-40 bg-black"
      ></div>
    </div>
  );
};

export default ChooseCoursePopup;
