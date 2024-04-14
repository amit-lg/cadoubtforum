import PropTypes from "prop-types";
import { MdArrowRight } from "react-icons/md";
const Breadcrum = ({ question }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="pl-3 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm md:text-base">
        <li className="inline-flex items-center">
          {
            question?.fallnumber?.Points[0]?.topics?.OpenForumSubject
              ?.name
          }
        </li>
        <li className="flex items-center gap-2">
          {question?.fallnumber?.Points[0]?.topics?.name !== "empty" && <MdArrowRight />}
          {question?.fallnumber?.Points[0]?.topics?.name === "empty"
            ? ""
            : question?.fallnumber?.Points[0]?.topics?.name}
        </li>

        <li className="flex items-center gap-2">
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
