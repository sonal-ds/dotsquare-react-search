import { VerticalConfig } from "../components/search/UniversalResults";
import LocationSection from "../sections/LocationSection";
import FaqCard from "../components/cards/FaqCards";
import LocationCard from "../components/cards/LocationCard";
import EcpertiesCard from "../components/cards/EcpertiesCard";


export type UniversalResultsConfig = Record<string, VerticalConfig>;
export const universallimit = 3;
export const universalResultsConfig: UniversalResultsConfig = {
  locations: {
    SectionComponent: LocationSection,
    label: "Locations",
    viewAllButton: true,
    cardConfig: {
      CardComponent: LocationCard,
      showOrdinal: false,
    },
  },
  faqs: {
    label: "FAQs",
    viewAllButton: true,
    cardConfig: {
      CardComponent: FaqCard,
      showOrdinal: false,
    },
  },
  experties:{
    label: "Experties",
    viewAllButton: true,
    cardConfig: {
      CardComponent: EcpertiesCard,
      showOrdinal: false,
    },
  },
  industries:{
    label: "Industries",
    viewAllButton: true,
    cardConfig: {
      CardComponent: EcpertiesCard,
      showOrdinal: false,
    },
  },
  technology_: {
    label: "Technology",
    viewAllButton: true,
    cardConfig: {
      CardComponent: EcpertiesCard,
      showOrdinal: false,
    },
  },
  services: {
    label: "Services",
    viewAllButton: true,
    cardConfig: {
      CardComponent: EcpertiesCard,
      showOrdinal: false,
    },
  },
};
