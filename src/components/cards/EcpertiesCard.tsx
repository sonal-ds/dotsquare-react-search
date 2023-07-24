import * as React from "react";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Ce_experties  from "../../types/experties";

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
    console.log(value,'')
  };

  const name = result.name
const desc = result.description
const logo = result.rawData.primaryPhoto?.image.url
const ctaLable = result.rawData.c_primaryCTA?.label
const cta = result.rawData.c_primaryCTA?.link

  return (
    <div className= "experties">
        <img src={logo}/>
     <h1>{name}</h1>
     <p>{desc}</p>

                    <Link
                      type="button"
                      href={cta}
                      className=" btn notHighlight btn-store"
                      data-ya-track={`viewStore -${ctaLable}`}
                      eventName={`viewStore -${name}`}
                      rel="noopener noreferrer"
                    >
                      {ctaLable}
                    </Link>
     
    </div>
  );
};

export default EcpertiesCard;
