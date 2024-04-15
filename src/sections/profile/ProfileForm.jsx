import ProfileInput from "./ProfileInput";
import Button from "../../components/Button";
import ProfileTextArea from "./ProfileTextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  setBio,
  setFbUrl,
  setName,
  setInstaUrl,
  setLinkedInUrl,
  setTwitterUrl,
  setDOB,
} from "../../redux/reducers/userReducer";
import {
  updateProfile,
  updateProfileWithImage,
} from "../../apiCalls/user/user";
import PropTypes from "prop-types";
import DateInput from "../../components/DateInput";
// import { validateLink } from "../../utils/validators";

// Avatar will come as prop

const ProfileForm = ({
  canUpdateDOB,
  canUpdate,
  picUpdated,
  avatar,
  setPicUpdated,
  setCanUpdate,
  setLoading,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleBio = (e) => {
    dispatch(setBio(e.target.value));
  };

  const handleLinkedInUrl = (e) => {
    dispatch(setLinkedInUrl(e.target.value));
  };

  const handleName = (e) => {
    dispatch(setName(e.target.value));
  };

  const handleDOB = (e) => {
    dispatch(setDOB(e.target.value));
  };

  const handleInstaUrl = (e) => {
    dispatch(setInstaUrl(e.target.value));
  };

  const handleTwitterUrl = (e) => {
    dispatch(setTwitterUrl(e.target.value));
  };

  const handleFacebookUrl = (e) => {
    dispatch(setFbUrl(e.target.value));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let data;
    if (picUpdated) {
      data = new FormData();
      data.append(
        "socials",
        JSON.stringify({
          facebook: user?.fbUrl,
          instagram: user?.instaUrl,
          twitter: user?.twitterUrl,
          linkedin: user?.linkedInUrl,
        })
      );
      data.append("bio", user?.bio);
      data.append("pictures", avatar);

      if (canUpdateDOB) {
        data.append("dob", user?.dob);
      }

      const response = await updateProfileWithImage(data);
      if (response?.status === 200) {
        setPicUpdated(false);
        setCanUpdate(false);
      }
    } else {
      const socials = JSON.stringify({
        facebook: user?.fbUrl,
        instagram: user?.instaUrl,
        twitter: user?.twitterUrl,
        linkedin: user?.linkedInUrl,
      });

      const bio = user?.bio;
      const dob = user?.dob;

      if (canUpdateDOB) {
        data = {
          socials,
          bio,
          dob,
        };
      } else {
        data = {
          socials,
          bio,
        };
      }
      const response = await updateProfile(data);
      if (response?.status === 200) {
        setPicUpdated(false);
        setCanUpdate(false);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">Personal Info</h3>
          <div className="flex gap-3 flex-col w-full">
            <ProfileInput
              required={true}
              name="name"
              id="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              onChange={handleName}
              value={user?.name}
              disabled={true}
            />

            <DateInput
              required={true}
              name="dob"
              id="dob"
              type="date"
              label="Date of Birth"
              placeholder="Enter your date of birth"
              onChange={handleDOB}
              value={user?.dob}
              disabled={!canUpdateDOB}
            />

            <ProfileInput
              required={true}
              name="email"
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              disabled={true}
              value={user.email}
              e
            />

            <ProfileInput
              required={true}
              name="phone"
              id="phone"
              type="tel"
              label="Phone"
              placeholder="Enter your phone number"
              disabled={true}
              value={user?.phone}
            />
          </div>
        </div>

        <div className="flex gap-3 flex-col w-ful">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Socail Media Linkks</h3>
            <ProfileInput
              required={true}
              name="linkedInUrl"
              id="linkedInUrl"
              type="text"
              label="LinkedIn Url"
              placeholder="Add your LinkedIn Url"
              onChange={handleLinkedInUrl}
              value={user?.linkedInUrl}
              disabled={canUpdate}
            />

            <ProfileInput
              required={true}
              name="instaUrl"
              id="instaUrl"
              type="text"
              label="Instagram Url"
              placeholder="Add your Instagram Url"
              onChange={handleInstaUrl}
              value={user?.instaUrl}
              disabled={canUpdate}
            />

            <ProfileInput
              required={true}
              name="twitterUrl"
              id="twitterUrl"
              type="text"
              label="Twitter Url"
              placeholder="Add your Twitter Url"
              onChange={handleTwitterUrl}
              value={user?.twitterUrl}
              disabled={canUpdate}
            />

            <ProfileInput
              required={true}
              name="facebookUrl"
              id="facebookUrl"
              type="text"
              label="Facebook Url"
              placeholder="Add your Facebook Url"
              onChange={handleFacebookUrl}
              value={user?.fbUrl}
              disabled={canUpdate}
            />
          </div>
        </div>
      </div>

      <ProfileTextArea
        name="bio"
        id="bio"
        type="text"
        label="Bio"
        placeholder="Enter your bio"
        onChange={handleBio}
        value={user?.bio}
        disabled={canUpdate}
      />

      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded sm:w-max w-full self-start"
        onClick={handleSubmit}
        disabled={false}
      >
        Save
      </Button>
    </form>
  );
};

export default ProfileForm;

ProfileForm.propTypes = {
  user: PropTypes.object,
  canUpdate: PropTypes.bool,
  canUpdateDOB: PropTypes.bool,
  avatar: PropTypes.string,
  picUpdated: PropTypes.bool,
  setPicUpdated: PropTypes.func,
  setCanUpdate: PropTypes.func,
  setLoading: PropTypes.func,
};
