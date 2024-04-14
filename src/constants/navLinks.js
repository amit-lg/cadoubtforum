import { MdDashboard, MdHelp, MdLiveHelp, MdOutlineDashboard, MdOutlineHelp } from "react-icons/md";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { BiCube, BiSolidCube } from "react-icons/bi";
import { MdOutlineLiveHelp } from "react-icons/md";
import { PiChats , PiChatsFill } from "react-icons/pi";
import { RiCloseCircleFill , RiCloseCircleLine } from "react-icons/ri";
export const routes = [
  {
    label: "Dashboard",
    icon : MdOutlineDashboard,
    selectedIcon: MdDashboard,
    href: "/dashboard",
  },
  {
    label: "All Questions",
    icon : PiChats,
    selectedIcon: PiChatsFill,
    href: "/all-questions",
  },
  {
    label: "Asked Questions",
    icon: BiCube,
    selectedIcon: BiSolidCube,
    href: "/asked-questions",
  },
  {
    label: "Pinned Questions",
    icon: TbPinned,
    selectedIcon: TbPinnedFilled,
    href: "/pinned-questions",
  },
  {
    label: "Unanswered Questions",
    icon: RiCloseCircleLine,
    selectedIcon: RiCloseCircleFill,
    href: "/unanswered-questions",
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
  },
];
