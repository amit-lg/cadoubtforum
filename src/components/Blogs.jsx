import SectionHeading from "./SectionHeading";
import Card from "./ui/Card";
import { MdArrowOutward } from "react-icons/md";

const blogs = [
  {
    title: "Monthly Snapshot - March 2024",
    description:
      "Step into the world of H&M, where European flair meets American fashion sensibility. How does the brand balance quality and affordability?",
    url: "https://blog.leveragedgrowth.in/monthly-snapshot-march-2024/",
    img: "/blog-image-1.png",
  },
  {
    title: "Monthly Snapshot – April 2024",
    description:
      "Step into the world of sweetness with Cadbury’s heartwarming campaign, #ThankYouFirstCoach, which shines a spotlight on cricket’s unsung heroes: the first coaches who nurture budding talent.",
    url: "https://blog.leveragedgrowth.in/monthly-snapshot-april-2024/",
    img: "/blog-image-3.png",
  },
];

const Blogs = () => {
  return (
    <div className="text-black  flex flex-col relative h-[400px] w-full p-2 rounded-md mt-5 md:mt-0">
      <div className="w-full flex items-center gap-2">
        <SectionHeading text="Popular Blogs" />

        <a href="https://blog.leveragedgrowth.in/">
          <MdArrowOutward />
        </a>
      </div>

      <div className="mt-3 py-3 h-[calc(100%-28px)] flex flex-col gap-5 overflow-y-scroll scrollbar-none">
        {blogs?.map((blog) => (
          <a key={blog?.url} href={blog?.url} target="_blank">
            <Card className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img
                className="h-[100px] w-[100px] object-contain"
                src={blog?.img}
                alt=""
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{blog?.title}</h3>
                <p className="text-sm">{blog?.description}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
