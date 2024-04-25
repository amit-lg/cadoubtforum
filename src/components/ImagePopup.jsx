import { useDispatch, useSelector } from "react-redux";
import {
  closeImagePopup,
  setImagePopupImg,
} from "../redux/reducers/appReducer";
import { MdClose } from "react-icons/md";

const ImagePopup = () => {
  const { imagePopupImg } = useSelector((state) => state.app);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeImagePopup());
    dispatch(setImagePopupImg(""));
  };

  return (
    <div className="h-screen w-full">
      <div className="h-full w-full flex items-center justify-center">
        <div className="relative p-5 w-[90%] h-[70%] md:h-[80%] sm:w-[80%] md:w-[70%] lg:w-[60%] rounded-md justify-center items-center flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
          <img
            src={imagePopupImg}
            className="w-full h-full object-contain rounded-md"
            alt="Attachment"
          />
          <div onClick={handleClose} className="cursor-pointer absolute top-0 right-0 p-1 bg-white rounded-full">
            <MdClose />
          </div>
        </div>
        <div
          onClick={handleClose}
          className="absolute opacity-25 h-full w-full inset-0 z-40 bg-black"
        ></div>
      </div>
    </div>
  );
};

export default ImagePopup;
