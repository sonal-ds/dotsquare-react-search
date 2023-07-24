
import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  TemplateProps,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import {
  SpellCheck,
  ResultsCount,
  Pagination,
} from "@yext/search-ui-react";
import Navigation from "../components/search/Navigation";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import VerticalResults from "../components/search/VerticalResults";
import YextSearchBar from "../components/search/YextSearchBar";
import { favicon } from "../sites-global/global";
import EcpertiesCard from "../components/cards/EcpertiesCard";


export const config: TemplateConfig = {
  stream: {
    $id: "experties",
    fields: ["name", "slug"],
    filter: {
      entityIds: ["experties-globsl-data"],
    },
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return "experties";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `${
      document._site.c_faq_meta_title
        ? document._site.c_faq_meta_title
        : `Any Questions Related to Our Tech & Services? Ask here | Dotsquares`
    }`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document._site.c_faq_meta_description
              ? document._site.c_faq_meta_description
              : `Dotsquares - Find the answers of all your Tech or Services related queries here. Upscale your Bandwidth! Call us Today! .`
          }`,
        },
      },

      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:title",
          content: `${
            document._site.c_faq_meta_title
              ? document._site.c_faq_meta_title
              : `Any Questions Related to Our Tech & Services? Ask here | Dotsquares .`
          }`,
        },
      },
    ],
  };
};

answersHeadlessConfig.verticalKey = "experties";
const searcher = provideHeadless(answersHeadlessConfig);

const ExpertiesPages: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;
  return (
    <React.Fragment>
      {/* <PageLayout _site={_site}> */}
        <SearchHeadlessProvider searcher={searcher}>
          <div className="pb-12">
            <div className="header-bg">
              <div className="mx-auto flex max-w-[90rem] px-5 flex-col search_vertical">
                <YextSearchBar
                 
                  _site={_site}
                  vertical={"experties"}
                />
                <Navigation />
              </div>
            </div>
            <div>
             
            </div>
            <div className="mx-auto flex max-w-[90rem] flex-col bg-white py-0 px-5 mt-6 pb-6 mb-6">
              <ResultsCount
                customCssClasses={{ resultsCountContainer: "resultcount-faq" }}
              />
              <section>
                {/* <DirectAnswer /> */}
                <SpellCheck />
                {/* <p className="nlpFilter">
                  <AppliedFilters hiddenFields={["builtin.entityType"]} />
                </p> */}
                <VerticalResults
                  CardComponent={EcpertiesCard}
                  displayAllOnNoResults={false}
                />
              </section>
            </div>
            <Pagination />
          </div>
        </SearchHeadlessProvider>
      {/* </PageLayout> */}
    </React.Fragment>
  );
};

export default ExpertiesPages;
