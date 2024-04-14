import SectionHeading from "../components/SectionHeading";
import AccordionSection from "../components/AccordionSection";
import {
  faqGeneralQuestion,
  faqModerationAndGuidelines,
  faqPostingQuestion,
  faqTechnicalIssues,
} from "../constants/faq";
import { tabs } from "../constants/tabs";
import { useState } from "react";
const Faq = () => {
  const [tabValue, setTabValue] = useState("general");
  const handleTableValue = (value) => {
    setTabValue(value);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="mt-2">
        <div className="w-[100%] overflow-x-scroll space-x-3 h-fit whitespace-nowrap">
          <div className="flex gap-3">
            {tabs?.map((tab) => (
              <button
                onClick={() => handleTableValue(tab.value)}
                className={`p-2 rounded-full px-6 ${
                  tab.value === tabValue
                    ? "text-white bg-blue-500"
                    : "text-gray-400 bg-white border border-gray-400"
                }`}
                key={tab.value}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {tabValue === "general" && (
            <section className="col-span-12 md:col-span-6 ">
              <div className="flex flex-col gap-3">
                {faqGeneralQuestion.map((item, index) => (
                  <AccordionSection
                    key={index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </section>
          )}

          {tabValue === "posting" && (
            <section className="col-span-12 md:col-span-6 ">
              <div className="flex flex-col gap-3">
                {faqPostingQuestion.map((item, index) => (
                  <AccordionSection
                    key={index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </section>
          )}

          {tabValue === "moderation" && (
            <section className="col-span-12 md:col-span-6 ">
              <div className="flex flex-col gap-3">
                {faqModerationAndGuidelines.map((item, index) => (
                  <AccordionSection
                    key={index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </section>
          )}

          {tabValue === "technical" && (
            <section className="col-span-12 md:col-span-6 ">
              <div className="flex flex-col gap-3">
                {faqTechnicalIssues.map((item, index) => (
                  <AccordionSection
                    key={index}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faq;
