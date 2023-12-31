import { Hours } from "@yext/search-core";
import { SiteData } from "../../types";
import { HoursManipulator } from "./Hours/hoursManipulator";
import React from "react";
import moment from "moment-timezone";
import { answersHeadlessConfig } from "../../config/answersHeadlessConfig";
interface OpenCloseProps {
  hours: Hours;
  timezone: string;
  site: string;
}

export default function OpenCloseStatus(props: OpenCloseProps) {
  const { timezone, site } = props;
  const h = new HoursManipulator(props.hours, timezone);
  const currentInterval = h.getCurrentInterval();
  const isOpenNow = currentInterval?.isOpened(site);
  let openedAt = "";
  if (h.hours.reopenDate) {
    openedAt = "Temprary Closed";
  } else if (!isOpenNow) {
    const nInterval = h.getIntervalsForNDays(7, moment());
    if (nInterval.length > 0) {
      for (let index = 0; index < nInterval.length; index++) {
        const interval = nInterval[index];
        if (interval.isOpened(site)) {
          openedAt = `Closed - Opens at ${interval.getStartTime(site)} ${interval.getWeekDay()}`;
          break;
        }
      }
    } else {
      openedAt = "Closed";
    }
  } else if (currentInterval && currentInterval.interval.end === "23:59" && currentInterval.interval.start === "00:00") {
    openedAt = `Open 24 Hours`;
  } else {
    openedAt = `Open - Close at ${currentInterval?.getEndTime(site)}`;
  }

  return openedAt ? <div className="open-close">{openedAt}</div> : null;
}
