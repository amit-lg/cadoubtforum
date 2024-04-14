import { FaGithub, FaGoogle } from "react-icons/fa";
import Icon from "../../components/Icon";

const AuthIcons = () => {
  return (
    <div className="w-full flex gap-3 items-center justify-center">
      <Icon>
        <FaGithub />
      </Icon>
      <Icon>
        <FaGoogle />
      </Icon>
    </div>
  );
};

export default AuthIcons;
