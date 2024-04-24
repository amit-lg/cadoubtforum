import { useEffect, useState } from "react";
import RecentQuestions from "./feed/RecentQuestions";
import Replies from "./feed/Replies";
import StatsContainer from "./stats/StatContainer";
import StatItem from "./stats/StatItem";
import {
  getDashboardQuestionAndReplies,
  getStats,
} from "../../apiCalls/question";
import { PiChatsFill } from "react-icons/pi";
import { BiSolidCube } from "react-icons/bi";
import { TbPinnedFilled } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";
import GuidedTour from "../../components/GuidedTourForDashboard";
import Calender from "../../pages/Calender";
import Blogs from "../../components/Blogs";

export const DashBoardContent = () => {
  const [allQuestions, setAllQuestions] = useState(0);
  const [pinnedQuestions, setPinnedQuestions] = useState(0);
  const [askedQuestions, setAskedQuestions] = useState(0);
  const [unAnsweredQuestions, setUnansweredQuestions] = useState(0);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [repliesOnMyQuestions, setRepliesOnMyQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const stats = [
    {
      bgColor: "bg-[#05ab4c]/10",
      iconColor: "text-[#05ab4c]",
      icon: PiChatsFill,
      title: "All Questions",
      className: "all-questions",
      number: allQuestions,
    },
    {
      bgColor: "bg-[#FF9540]/10",
      iconColor: "text-[#FF9540]",
      icon: BiSolidCube,
      title: "Asked Questions",
      className: "asked-questions",
      number: askedQuestions,
    },
    {
      bgColor: "bg-[#0e5ec2]/10",
      iconColor: "text-[#0e5ec2]",
      icon: TbPinnedFilled,
      title: "Pinned Questions",
      className: "pinned-questions",
      number: pinnedQuestions,
    },
    {
      bgColor: "bg-[#dc1427]/10",
      iconColor: "text-[#dc1427]",
      icon: RiCloseCircleFill,
      title: "Unanswered Questions",
      className: "unanswered-questions",
      number: unAnsweredQuestions,
    },
  ];

  const fetchQuestionsStats = async () => {
    const response = await getStats();
    if (response?.status === 200) {
      setAllQuestions(response?.data?.questionCount);
      setAskedQuestions(response?.data?.questionAsked);
      setPinnedQuestions(response?.data?.questionPinned);
      setUnansweredQuestions(response?.data?.questionUnanswered);
    }
  };

  const getDashboardQuestionAndAnswers = async () => {
    setLoading(true);
    const response = await getDashboardQuestionAndReplies();
    if (response?.status === 200) {
      setRecentQuestions(response?.data?.question);
      setRepliesOnMyQuestions(response?.data?.answers);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionsStats();
  }, []);

  useEffect(() => {
    getDashboardQuestionAndAnswers();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <GuidedTour />
      <StatsContainer>
        {stats.map((stat) => (
          <StatItem key={stat.title} stat={stat} />
        ))}
      </StatsContainer>

      <div className="grid mt-5 lg:mt-0 grid-cols-1 xl:grid-cols-2 lg:space-y-0 bg-transparent">
        <RecentQuestions loading={loading} questions={recentQuestions} />
        <Calender />
      </div>

      <div className="grid mt-5 lg:mt-0 grid-cols-1 xl:grid-cols-2 lg:space-y-0 bg-transparent">
        <Replies size="small" loading={loading} replies={repliesOnMyQuestions} />
        <Blogs />
      </div>
    </div>
  );
};
