import React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import { Faq } from "../../types/faqs";
import RtfConverter from "@yext/rtf-converter";
import { Accordion, AccordionItem } from "react-light-accordion";
import { Link } from "@yext/pages/components";

const FaqCard: CardComponent<Faq> = ({
  result,
}: CardProps<Faq>): JSX.Element => {
  const Faq = result.rawData;
  const id = result.id;
  const question = Faq.question;
  const answer = Faq.answer;
  const ctaLable = result.rawData.c_primaryCTA?.label;
  const cta = result.rawData.c_primaryCTA?.link;
  return (
    <li className="faq-sec">
      <div className="faq-blocks">
        <Accordion atomic={true}>
          <AccordionItem className="faq-title" title={question}>
            {" "}
            <span className="faq-icon"></span>
            <div className="faq-content new-accr">
              <div
                dangerouslySetInnerHTML={{
                  __html: RtfConverter.toHTML(answer),
                }}
              />
            </div>
            <div className="btn-sliding-arrow">
            <Link
              type="button"
              href={cta}
              className="faq-learn-more"
              data-ya-track={`viewStore -${ctaLable}`}
              eventName={`viewStore -${name}`}
              rel="noopener noreferrer"
            >
              {ctaLable}
            </Link>
            <div className="sliding-arrow">

            </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
    </li>
  );
};

export default FaqCard;
