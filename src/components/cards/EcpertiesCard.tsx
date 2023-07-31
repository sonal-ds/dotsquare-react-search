import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Ce_experties from "../../types/experties";

import { Link } from "@yext/pages/components";

interface IconProps {
  id: number;
  open: number;
}

const EcpertiesCard: CardComponent<Ce_experties> = ({
  result,
}: CardProps<Ce_experties>): JSX.Element => {
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value);
    console.log(value, "");
  };

  const name = result.name;
  const desc = result.description;
  const logo = result.rawData.primaryPhoto?.image.url;
  const ctaLable = result.rawData.c_primaryCTA?.label;
  const cta = result.rawData.c_primaryCTA?.link;

  return (
    <li className="experties">
      <div className="card-wrapper">
        <div className="card-image-wrapper">
          <img src={logo} />
        </div>
        <div className="card-content-wrapper">
          <h2>{name}</h2>
          <div className="card-content">
            <p>{desc}</p>
            <div className="mt-5 btn-sliding-arrow">
              <Link
                type="button"
                href={cta}
                className=" btn notHighlight card-button"
                data-ya-track={`viewStore -${ctaLable}`}
                eventName={`viewStore -${name}`}
                rel="noopener noreferrer"
              >
                {ctaLable}
              </Link>
              <div className="sliding-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default EcpertiesCard;
