import { MdReportProblem, MdThumbUp } from "react-icons/md";
import EachActionButton from "../EachActionButton";

const ReplyActionButtons = () => {
  return (
    <div className="flex text-gray-400 mx-3 items-center gap-2">
      <EachActionButton Icon={MdThumbUp} value={5} />
      <EachActionButton Icon={MdReportProblem } value={5} />
    </div>
  );
};

export default ReplyActionButtons;
