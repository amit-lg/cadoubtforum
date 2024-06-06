import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout";
import AskedQuestions from "./pages/AskedQuestions";
import PinnedQuestions from "./pages/PinnedQuestions";
import UnansweredQuestions from "./pages/UnansweredQuestions";
import QuestionDetails from "./pages/QuestionDetails";
import Faq from "./pages/Faq";
import ProtectRoute from "./components/ProtectRoute";
import Help from "./pages/Help";
import Profile from "./pages/Profile";
import InfiniteScrollWithFilters from "./pages/AllQuestions";
import EmailVerification from "./pages/EmailVerification";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Calendar from "./pages/Calender";
import PasswordLayout from "./layouts/PasswordLayout";
import AuthTest from "./pages/AuthTestPage";
import AllQuestions from "./pages/AllQuestions";
import TestPopup from "./components/TestPopup";
import Page404 from "./pages/Page404";

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <div className="h-full transition-all ease-in-out duration-700">
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              {/* <Route path="" element={<Auth />} /> */}
              <Route path="" element={<AuthTest />} />
              <Route path="verifyEmail" element={<EmailVerification />} />
            </Route>

            <Route path="/" element={<PasswordLayout />}>
              <Route path="forgot-password" element={<ForgetPassword />} />
              <Route path="forgotpassword" element={<ResetPassword />} />
            </Route>

            <Route path="/" element={<AppLayout />}>
              <Route path="" element={<ProtectRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                {/* <Route path="all-questions" element={<AllQuestions />} /> */}
                <Route path="asked-questions" element={<AskedQuestions />} />
                <Route path="pinned-questions" element={<PinnedQuestions />} />
                <Route path="question/:id" element={<QuestionDetails />} />
                <Route path="profile" element={<Profile />} />
                <Route path="all-questions" element={<AllQuestions />} />
                <Route path="test2" element={<InfiniteScrollWithFilters />} />

                <Route path="test-popup" element={<TestPopup />} />
                <Route
                  path="unanswered-questions"
                  element={<UnansweredQuestions />}
                />
                <Route path="faq" element={<Faq />} />
                <Route path="help" element={<Help />} />
                <Route path="calender" element={<Calendar />} />
              </Route>
            </Route>

            <Route path="/not-found" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
