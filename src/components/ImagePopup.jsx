import { useDispatch, useSelector } from "react-redux";
import { closeImagePopup, setImagePopupImg } from "../redux/reducers/appReducer";

const ImagePopup = () => {
  const { imagePopupImg } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeImagePopup());
    dispatch(setImagePopupImg(''));
  };

  return (
    <div className="h-screen w-full" onClick={handleClose}>
      <div className="h-full w-full flex flex-col">
        <div className="h-full w-full">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-[90%] sm:w-[70%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-md">
              <img
                src={imagePopupImg}
                className="w-full h-full object-contain rounded-md"
                alt="Attachment"
              />
            </div>
          </div>
          <div
            onClick={handleClose}
            className="opacity-25 h-full w-full inset-0 z-40 bg-black"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
