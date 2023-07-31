import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import PageLayout from "../components/PageLayout";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import { LocationBias, Pagination, SpellCheck } from "@yext/search-ui-react";
import Navigation from "../components/search/Navigation";
import UniversalResults from "../components/search/UniversalResults";
import { universalResultsConfig } from "../config/universalResultsConfig";

import YextSearchBar from "../components/search/YextSearchBar";
import { favicon } from "../sites-global/global";

const universalResultsFilterConfig = {
  show: false,
};

export const config: TemplateConfig = {
  stream: {
    $id: "search",
    fields: ["name", "slug"],
    filter: {
      entityIds: ["universal"],
    },
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return "index.html";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `${
      document._site.c_faq_meta_title
        ? document._site.c_faq_meta_title
        : `Any Questions Related to Our Tech & Services? Ask here | Dotsquares.`
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
              : `Any Questions Related to Our Tech & Services? Ask here | Dotsquares.`
          }`,
        },
      },
    ],
  };
};
const searcher = provideHeadless(answersHeadlessConfig);

const Search: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;
  return (
    <>
      {/* <PageLayout _site={_site}> */}
      <SearchHeadlessProvider searcher={searcher}>
        <div className="pb-12">
          <div className="header-bg">
            <div className="flex px-5 flex-col container-custom search_vertical">
              <div className="yext-search-bar container-custom-small">
                <YextSearchBar universal="index" _site={_site} />
              </div>
              <Navigation />
            </div>
          </div>
          <div className="flex flex-col container-custom-small bg-white py-0 px-5 mt-6 pb-6">
            <SpellCheck />
            {/* <DirectAnswer /> */}
            <UniversalResults
              appliedFiltersConfig={universalResultsFilterConfig}
              verticalConfigs={universalResultsConfig}
            />
          </div>
          <Pagination />
        </div>
        <LocationBias />
      </SearchHeadlessProvider>
      {/* </PageLayout> */}
    </>
  );
};

export default Search;
