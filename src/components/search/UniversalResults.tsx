import * as React from "react";
import { useSearchState, VerticalResults } from "@yext/search-headless-react";
import StandardSection from "../../sections/StandardSection";
import SectionHeader from "../../sections/SectionHeader";
import classNames from "classnames";
import {
  AppliedFiltersProps,
  SectionComponent,
  useComposedCssClasses,
} from "@yext/search-ui-react";
import { CompositionMethod } from "../interface/interface";
import { CardConfig } from "../../models/cardComponent";

interface UniversalResultsCssClasses {
  container?: string;
  results___loading?: string;
}

const builtInCssClasses: UniversalResultsCssClasses = {
  container: "mt-6",
  results___loading: "opacity-50",
};

export interface VerticalConfig {
  SectionComponent?: SectionComponent;
  cardConfig?: CardConfig;
  label?: string;
  viewAllButton?: boolean;
}

interface AppliedFiltersConfig
  extends Omit<AppliedFiltersProps, "appliedQueryFilters"> {
  show: boolean;
}

interface UniversalResultsProps {
  appliedFiltersConfig?: AppliedFiltersConfig;
  verticalConfigs: Record<string, VerticalConfig>;
  customCssClasses?: UniversalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

/**
 * A component that displays all the vertical results of a universal search.
 */
export default function UniversalResults({
  verticalConfigs,
  appliedFiltersConfig,
  customCssClasses,
}: UniversalResultsProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses);
  const resultsFromAllVerticals =
    useSearchState((state) => state?.universal?.verticals) || [];
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);

  const latestQuery = useSearchState((state) => state.query.input) || "";
  const resultsClassNames = classNames(cssClasses.container, {
    [cssClasses.results___loading ?? ""]: isLoading,
  });

  return typeof sessionStorage == "undefined" &&
    resultsFromAllVerticals &&
    resultsFromAllVerticals.length === 0 ? (
    <div className="mb-6 pb-6 mt-6 pt-6">
      <p className="text-2xl font-bold">No results found</p>
      {console.log("np")}
    </div>
  ) : (
    <div className={resultsClassNames}>
      {renderVerticalSections({
        resultsFromAllVerticals,
        appliedFiltersConfig,
        verticalConfigs,
        latestQuery,
      })}
    </div>
  );
}

interface VerticalSectionsProps extends UniversalResultsProps {
  resultsFromAllVerticals: VerticalResults[];
  latestQuery: string;
}

/**
 * Renders a list of SectionComponent based on the given list of vertical results and corresponding configs,
 * including specifing what section template to use.
 */
function renderVerticalSections(props: VerticalSectionsProps): JSX.Element {
  const { resultsFromAllVerticals, verticalConfigs, latestQuery } = props;

  const sortedResultFromAllVerticals = [];
  const locationResults = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "locations");
  const faqResults = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "faqs");
  const technologyResult = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "technology_");
  const servicesResults = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "services");
  const industriesResults = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "industries");
  const expertiesResults = resultsFromAllVerticals
    .filter((verticalResults) => verticalResults.results)
    .find((e) => e.verticalKey === "experties");

  if (locationResults) {
    sortedResultFromAllVerticals.push(locationResults);
  }
  if (faqResults) {
    sortedResultFromAllVerticals.push(faqResults);
  }
  if (technologyResult) {
    sortedResultFromAllVerticals.push(technologyResult);
  }
  if (servicesResults) {
    sortedResultFromAllVerticals.push(servicesResults);
  }
  if (industriesResults) {
    sortedResultFromAllVerticals.push(industriesResults);
  }
  if (expertiesResults) {
    sortedResultFromAllVerticals.push(expertiesResults);
  }

  return (
    <>
      {sortedResultFromAllVerticals.map((verticalResults) => {
        const verticalKey = verticalResults.verticalKey;
        const verticalConfig = verticalConfigs[verticalKey] || {};

        const label = verticalConfig.label ?? verticalKey;
        const results = verticalResults.results;

        const SectionComponent =
          verticalConfig.SectionComponent || StandardSection;

        const { show, ...filterconfig } = props.appliedFiltersConfig || {};
        const appliedFiltersConfig = show
          ? {
              ...filterconfig,
              appliedQueryFilters: verticalResults.appliedQueryFilters,
            }
          : undefined;

        const resultsCountConfig = {
          resultsCount: verticalResults.resultsCount,
          resultsLength: results.length,
        };

        return (
          <>
            <SectionComponent
              results={results}
              verticalKey={verticalKey}
              header={
                <SectionHeader
                  {...{
                    label,
                    resultsCountConfig,
                    appliedFiltersConfig,
                    verticalKey,
                    results,
                    viewAllButton: verticalConfig.viewAllButton,
                  }}
                />
              }
              cardConfig={verticalConfig.cardConfig}
              key={verticalKey}
            />
            <div className="text-center py-3 border border-platinum border-t-0 mb-11 rounded-br-md rounded-bl-md">
              <a
                className="view-all"
                href={`/${verticalKey}${
                  latestQuery ? `?query=${latestQuery}` : ""
                }`}
              >
                View all
                <svg
                  width="10px"
                  height="10px"
                  viewBox="0 0 7 9"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f5821f"
                >
                  <g fillRule="evenodd" transform="translate(-1 -8)">
                    <path d="m2.6417004 8-1.1417004 1.0575 3.70850202 3.4425-3.70850202 3.4425 1.1417004 1.0575 4.8582996-4.5z"></path>
                  </g>
                </svg>
              </a>
            </div>
          </>
        );
      })}
    </>
  );
}
