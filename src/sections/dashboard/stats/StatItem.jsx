/* eslint-disable react/prop-types */
import Card from "../../../components/ui/Card"

const StatItem = ({ stat}) => {
    return (
        <Card className={`${stat?.className}`}>
            <div className='w-full flex items-center gap-3 md:gap-2 py-2'>
                <div className={`rounded-full h-20 w-20 md:h-16 md:w-16 flex justify-center items-center ${stat.bgColor} p-2}`}>
                    <span className={`flex items-center justify-center font-semibold md:text-3xl text-4xl ${stat.iconColor}`} >
                        <stat.icon/>
                    </span>
                </div>

                <div className='flex flex-col w-[calc(100%-6rem)] md:w-[calc(100%-4rem)]'>
                    <span className='text-gray-400 font-semibold tracking-wide text-sm lg:text-xs xl:text-sm'>
                        {stat?.title}
                    </span>
                    <span>
                        {stat?.number}
                    </span>
                </div>
            </div>
        </Card>
    )
}

export default StatItem