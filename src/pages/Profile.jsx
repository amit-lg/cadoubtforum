import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaCamera,
} from "react-icons/fa6";
import Card from "../components/ui/Card";
import SectionHeading from "../components/SectionHeading";
import ProfileForm from "../sections/profile/ProfileForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../apiCalls/user/user";
import {
  setBio,
  setDOB,
  setFbUrl,
  setImage,
  setInstaUrl,
  setLinkedInUrl,
  setPhone,
  setTwitterUrl,
} from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import Loader from "../components/Loader";
const Profile = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [canUpdateDOB, setCanUpdateDOB] = useState(true);
  const [canUpdate, setCanUpdate] = useState(true);
  const [picUpdated, setPicUpdated] = useState(false);

  const onFileChange = (e) => {
    setPicUpdated(true);
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const toggleCanUpdate = () => {
    setCanUpdate(!canUpdate);
  };

  const fectchProfile = async () => {
    if (user?.dob !== "") {
      setCanUpdateDOB(true);
    }
    const response = await getProfile();
    if (response?.status === 200) {
      dispatch(setPhone(response?.data?.phone));
      dispatch(setImage(response?.data?.profile));
      dispatch(setBio(response?.data?.Contact?.Bio));
      if (response?.data?.Contact) {
        if (!response?.data?.Contact?.Birth) {
          setCanUpdateDOB(true);
        } else {
          setCanUpdateDOB(false);
        }
        dispatch(setDOB(response?.data?.Contact?.Birth));
        const socials = JSON.parse(response?.data?.Contact?.SocialMedia);
        dispatch(setFbUrl(socials?.facebook));
        dispatch(setTwitterUrl(socials?.twitter));
        dispatch(setInstaUrl(socials?.instagram));
        dispatch(setLinkedInUrl(socials?.linkedin));
      }
    }
  };

  useEffect(() => {
    fectchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6 fade-enter">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <Card className="p-4 sm:p-6   flex flex-col">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="relative shrink-0 md:mx-0 mx-auto">
                {avatarPreview || user?.image ? (
                  <img
                    src={avatarPreview || user?.image}
                    alt=""
                    className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start  "
                  />
                ) : (
                  <div className="bg-gray-200  rounded-full h-[100px] w-[100px] flex items-center justify-center">
                    <span className="text-white text-xl">
                      {user?.name?.split(" ")[0].charAt(0)}
                    </span>
                  </div>
                )}

                <div>
                  <input
                    onChange={onFileChange}
                    type="file"
                    id="avatar"
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar"
                    className="shadow bg-white p-1  rounded-full text-blue-500 absolute bottom-1 right-1"
                  >
                    <FaCamera />
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col-reverse gap-1 md:flex-row items-center justify-center md:justify-between w-full">
                  <h4 className="text-lg font-semibold text-center md:text-left text-orange-500">
                    {user?.name}
                  </h4>
                  {user?.batch?.Level && (
                    <span>
                      {"CA " +
                        user?.batch?.Level?.Name +
                        " " +
                        user?.batch?.Name}
                    </span>
                  )}
                </div>
                <p className=" text-center md:text-left whitespace-pre-wrap overflow-x-scroll">
                  {user?.bio}
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-4 space-x-4 align-center self-center md:self-end">
              <a
                rel="noopener noreferrer"
                href={user?.twitterUrl ? user?.twitterUrl : "#"}
                aria-label="Twitter"
                className="p-2 rounded-md  "
              >
                <FaXTwitter className="w-4 h-4 fill-current" />
              </a>
              <a
                rel="noopener noreferrer"
                href={user?.linkedinUrl ? user?.linkedinUrl : "#"}
                aria-label="LinkedIn"
                className="p-2 rounded-md"
              >
                <FaLinkedinIn className="w-4 h-4 fill-current" />
              </a>
              <a
                rel="noopener noreferrer"
                href={user?.instaUrl ? user?.instaUrl : "#"}
                aria-label="LinkedIn"
                className="p-2 rounded-md "
              >
                <FaInstagram className="w-4 h-4 fill-current" />
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                aria-label="LinkedIn"
                className="p-2 rounded-md"
              >
                <FaFacebookF className="w-4 h-4 fill-current" />
              </a>
            </div>
          </Card>
          <div className="flex items-center justify-between">
            <SectionHeading text="Profile" />
            <Button onClick={toggleCanUpdate}>
              {canUpdate ? "Edit" : "Done"}
            </Button>
          </div>
          <ProfileForm
            canUpdate={canUpdate}
            setCanUpdate={setCanUpdate}
            canUpdateDOB={canUpdateDOB}
            avatar={avatar}
            picUpdated={picUpdated}
            setPicUpdated={setPicUpdated}
            setLoading={setLoading}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
