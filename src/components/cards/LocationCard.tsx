import * as React from "react";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../sites-global/staticData";
import { LocationData } from "../../types/locations";
import { Address, Link } from "@yext/pages/components";
import { CardProps, CardComponent } from "@yext/search-ui-react";
import Phone from "../commons/Phone";
import OpenCloseStatus from "../commons/OpenCloseStatus";
import { answersHeadlessConfig } from "../../config/answersHeadlessConfig";

const LocationCard: CardComponent<LocationData> = ({
  result,
}: CardProps<LocationData>): JSX.Element => {
  const { address } = result.rawData;
  const data = result.rawData;
  const phone = data.mainPhone;
  const name: any = data.name?.toLowerCase();
  const metersToMiles = (meters: number) => {
    const miles = meters * 0.000621371;
    return miles.toFixed(2);
  };
  const phoneNumberList = data.c_phoneNumberList as string[];
  return (
    <li
      className={`location result-list-inner-${data.id} result`}
      id={`result-${data.id}`}
    >
      <div className="result-inner ">
        <div className="center-column">
          <div className="lp-param-results lp-subparam-hours">
            <div className="location-name-miles icon-row">
              <h2>{name}</h2>
              {/* Miles code */}
              {/* {result?.distance && (
                <span>
                  <svg
                    width="8"
                    height="13"
                    viewBox="0 0 8 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_143_849)">
                      <path
                        d="M0 0H1.19922V12.06H0V0ZM7.19531 4.221L2.39844 7.5978V0.8442L7.19531 4.221Z"
                        fill="#586249"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_143_849">
                        <rect width="7.79492" height="12.06" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  {metersToMiles(result?.distance)}
                </span>
              )} */}
              {/* Miles code */}
            </div>
            <div className="address-with-sperate">
              <div className="icon-row content-col address-with-availablity">
                <div className="address">
                  <Address address={address} />
                </div>

                {data.emails && (
                  <div className="address notHighlight items-center">
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 37.332 25.2"
                      >
                        <path
                          id="Icon_zocial-email"
                          data-name="Icon zocial-email"
                          d="M.072,27.036V6.3q0-.036.108-.684l12.2,10.44L.216,27.756a3.051,3.051,0,0,1-.144-.72Zm1.62-22.86A1.551,1.551,0,0,1,2.3,4.068H35.172a2.039,2.039,0,0,1,.648.108L23.58,14.652l-1.62,1.3-3.2,2.628-3.2-2.628-1.62-1.3ZM1.728,29.16,14,17.388l4.752,3.852,4.752-3.852L35.784,29.16a1.729,1.729,0,0,1-.612.108H2.3a1.631,1.631,0,0,1-.576-.108Zm23.4-13.1L37.3,5.616A2.149,2.149,0,0,1,37.4,6.3V27.036a2.759,2.759,0,0,1-.108.72Z"
                          transform="translate(-0.072 -4.068)"
                          fill="#304f00"
                        />
                      </svg>
                    </div>
                    <a href={`tel:${data.emails}`}>{data.emails}</a>
                  </div>
                )}

                {phoneNumberList && (
                  <div className="address notHighlight items-center mt-3 phone_2">
                    {phoneNumberList.map((item: any, index: number) => {
                      return (
                        <React.Fragment key={index}>
                          <div className="telephone">
                            <svg
                              width="19"
                              height="19"
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.5714 16.3778C6.74286 16.3778 2 11.6081 2 5.74657C2.00029 4.69826 2.3805 3.68599 3.06944 2.89927C3.75839 2.11256 4.70884 1.60532 5.74286 1.47254C6.05006 1.4339 6.36141 1.49719 6.62957 1.65277C6.89774 1.80836 7.10806 2.04774 7.22857 2.33453L8.66429 5.69629C8.75909 5.91427 8.79829 6.15261 8.77833 6.38968C8.75838 6.62675 8.67989 6.85507 8.55 7.05392L7.45 8.73481C7.93731 9.66092 8.69178 10.4171 9.61429 10.9041L11.2643 9.79793C11.4627 9.66612 11.6907 9.58596 11.9275 9.56465C12.1644 9.54333 12.4029 9.58153 12.6214 9.67581L15.9643 11.1196C16.2495 11.2408 16.4875 11.4524 16.6422 11.722C16.7969 11.9917 16.8599 12.3048 16.8214 12.6138C16.6894 13.6536 16.185 14.6095 15.4027 15.3023C14.6204 15.9951 13.6138 16.3775 12.5714 16.3778ZM5.74286 3.21807C5.16827 3.34287 4.65355 3.66188 4.28444 4.12196C3.91532 4.58204 3.7141 5.15542 3.71429 5.74657C3.71618 8.10833 4.64995 10.3728 6.31057 12.0428C7.9712 13.7129 10.223 14.6519 12.5714 14.6538C13.1593 14.654 13.7294 14.4516 14.1869 14.0804C14.6444 13.7092 14.9616 13.1916 15.0857 12.6138L12.0857 11.3208L10.4286 12.4342C10.2225 12.5713 9.98465 12.6526 9.73813 12.6703C9.49162 12.6879 9.24475 12.6412 9.02143 12.5347C7.63497 11.8595 6.51339 10.7366 5.83572 9.34538C5.72673 9.12195 5.67796 8.87368 5.69425 8.62536C5.71054 8.37704 5.79134 8.13737 5.92857 7.93028L7.02857 6.23503L5.74286 3.21807Z"
                                fill="#304F00"
                              />
                            </svg>
                          </div>
                          <a href={`tel:${item}`}>{item}</a>
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}
                <Phone phone={data.mainPhone} />
              </div>
              <div className="grow">
                {data.hours ? (
                  <OpenCloseStatus
                    hours={data.hours}
                    timezone={data.timezone}
                    site={answersHeadlessConfig.locale}
                  />
                ) : (
                  ""
                )}
              </div>
              {/*  */}
              <div className="facility_1">
                <div className="button-bx">
                  <div className="button-group text-right">
                    <Link
                      className=" button ghost-button rounded-md notHighlight"
                      data-ya-track="phone"
                      eventName="phone"
                      href={`tel:${phone}`}
                      rel="noopener noreferrer"
                    >
                      CALL
                    </Link>
                    {data.displayCoordinate ? (
                      <GetDirection
                        buttonText={StaticData.getDirection}
                        address={address}
                        latitude={data.displayCoordinate?.latitude}
                        longitude={data.displayCoordinate?.longitude}
                      />
                    ) : (
                      <GetDirection
                        buttonText={StaticData.getDirection}
                        address={address}
                        latitude={data.yextDisplayCoordinate?.latitude}
                        longitude={data.yextDisplayCoordinate?.longitude}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LocationCard;
