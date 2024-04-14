import {  TbPinnedFilled } from "react-icons/tb";
import { PiChatsFill } from "react-icons/pi";
import { BiSolidCube } from "react-icons/bi";
import { RiCloseCircleFill } from "react-icons/ri";



export const stats = [
    {
        bgColor: "bg-[#05ab4c]/10",
        iconColor: "text-[#05ab4c]",
        icon: PiChatsFill,
        title: "All Questions",
        number: 198,
    },
    {
        bgColor: "bg-[#FF9540]/10",
        iconColor: "text-[#FF9540]",
        icon: BiSolidCube,
        title: "Asked Questions",
        number: 2.4,
    },
    {
        bgColor: "bg-[#0e5ec2]/10",
        iconColor: "text-[#0e5ec2]",
        icon: TbPinnedFilled,
        title: "Pinned Questions",
        number: 198,
    },
    {
        bgColor: "bg-[#dc1427]/10",
        iconColor: "text-[#dc1427]",
        icon: RiCloseCircleFill,
        title: "Unanswered Questions",
        number: 198,
    },
]