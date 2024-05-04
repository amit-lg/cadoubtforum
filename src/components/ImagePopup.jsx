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
        <div className="bg-gray-50 p-2 relative p-5 w-[90%] h-[70%] md:h-[80%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex-col gap-3 rounded-md  flex overflow-x-hidden overflow-y-scroll z-50 outline-none focus:outline-none">
          <div className="flex flex-col gap-10 w-full h-full overflow-y-scroll">
            {imagePopupImg?.map((img) => (
              <div className="h-full w-full" key={img?.id}>
                <img
                  src={img?.ImagePath}
                  className="w-full h-full object-contain rounded-md"
                  alt="Attachment"
                />
              </div>
            ))}
          </div>
          <div
            onClick={handleClose}
            className="cursor-pointer absolute top-2 right-2 p-1 "
          >
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
