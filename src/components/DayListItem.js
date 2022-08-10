import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected,"day-list__item--full": (props.spots === 0)});

  const formatSpots = (remainingSpots) => {
    if (remainingSpots === 0) {
      return 'no spots remaining'
    }
    if (remainingSpots === 1) {
      return '1 spot remaining'
    }
    return `${remainingSpots} spots remaining`
  }


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light" >{formatSpots(props.spots)}</h3>
    </li>
  );
}
