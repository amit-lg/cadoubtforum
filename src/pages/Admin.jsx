import { useState } from "react";
import Button from "../components/Button";
import { MdAdd } from "react-icons/md";
import AddCourse from "../sections/admin/AddCourse";

const Admin = () => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const handleOpen = () => setShowAddCourseModal(true);
  const handleClose = () => setShowAddCourseModal(false);

  return (
    <>
      <div className="h-screen w-full">
        <div className="h-full w-full flex flex-col">
          <div className="h-[70px] w-full py-2 px-4 bg-white shadow flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Admin</h1>
            <Button onClick={handleOpen} className="flex items-center gap-5">
              <MdAdd /> Add Course
            </Button>
          </div>

          <div className="h-[calc(100vh-70px)] w-full">
              <AddCourse showAddCourseModal={showAddCourseModal} handleClose={handleClose}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
