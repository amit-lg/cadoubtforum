import { MdDashboard, MdFeedback, MdHelp, MdOutlineDashboard, MdOutlineDynamicFeed, MdOutlineHelp } from "react-icons/md";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { BiCube, BiSolidCube } from "react-icons/bi";
import { PiChats , PiChatsFill } from "react-icons/pi";
import { RiCloseCircleFill , RiCloseCircleLine } from "react-icons/ri";
export const routes = [
  {
    label: "Dashboard",
    icon : MdOutlineDashboard,
    selectedIcon: MdDashboard,
    href: "/dashboard",
    id : "dashboard-link",
  },
  {
    label: "All Questions",
    icon : PiChats,
    selectedIcon: PiChatsFill,
    href: "/all-questions",
    id: "all-questions-link",
  },
  {
    label: "Asked Questions",
    icon: BiCube,
    selectedIcon: BiSolidCube,
    href: "/asked-questions",
    id: "asked-questions-link",
  },
  {
    label: "Pinned Questions",
    icon: TbPinned,
    selectedIcon: TbPinnedFilled,
    href: "/pinned-questions",
    id: "pinned-questions-link",
  },
  {
    label: "Unanswered Questions",
    icon: RiCloseCircleLine,
    selectedIcon: RiCloseCircleFill,
    href: "/unanswered-questions",
    id: "unanswered-questions-link",
  },
];

export const otherRoutes = [
  // {
  //   label: "FAQs",
  //   icon: MdOutlineLiveHelp,
  //   selectedIcon: MdLiveHelp,
  //   href: "/faq",
  // },
  {
    label: "Help",
    icon: MdHelp,
    selectedIcon: MdOutlineHelp,
    href: "/help",
    id: "help-link",
  },
];


export const feedbackRoutes = [
  {
    label: "Feedback",
    icon: MdFeedback,
    selectedIcon: MdOutlineDynamicFeed,
    href: "/feedback",
    id: "feedback-link",
  },
]