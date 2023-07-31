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
import { SpellCheck, ResultsCount, Pagination } from "@yext/search-ui-react";
import Navigation from "../components/search/Navigation";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import LocationResults from "../components/LocationResults";
import { LocationProvider } from "../components/LocationContext";
import PageLayout from "../components/PageLayout";

import LocationCard from "../components/cards/LocationCard";
import YextSearchBar from "../components/search/YextSearchBar";
import { favicon } from "../sites-global/global";

export const config: TemplateConfig = {
  stream: {
    $id: "location",
    fields: ["name", "slug"],
    filter: {
      entityIds: ["location-global-data"],
    },
    localization: {
      locales: ["en_GB"],
      primary: false,
    },
  },
};
export const getPath: GetPath<TemplateProps> = () => {
  return "locations";
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

answersHeadlessConfig.verticalKey = "locations";

const searcher = provideHeadless(answersHeadlessConfig);

const LocationsPage: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;

  return (
    <React.Fragment>
      {/* <PageLayout _site={_site}> */}
      <SearchHeadlessProvider searcher={searcher}>
        <LocationProvider>
          <div className="pb-12">
            <div className="header-bg">
              <div className="flex px-5 flex-col container-custom search_vertical">
                <div className="yext-search-bar container-custom-small">
                  <YextSearchBar _site={_site} vertical={"locations"} />
                </div>
                <Navigation />
              </div>
            </div>

            <div className="flex flex-col container-custom-small bg-white py-0 px-5 mt-6 pb-6 mb-6">
              <ResultsCount
                customCssClasses={{ resultsCountContainer: "resultcount" }}
              />
              <section className="demo-1">
                {/* <DirectAnswer /> */}
                <SpellCheck />
                {/* <p className="nlpFilter">
                    <AppliedFilters hiddenFields={["builtin.entityType"]} />
                  </p> */}
                <LocationResults
                  verticalKey="locations"
                  cardConfig={{ CardComponent: LocationCard }}
                />
              </section>
            </div>
            <Pagination />
          </div>
        </LocationProvider>
      </SearchHeadlessProvider>
      {/* </PageLayout> */}
    </React.Fragment>
  );
};

export default LocationsPage;
