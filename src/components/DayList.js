import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const list = props.days.map(element => 
    <DayListItem 
    key={element.id}
    name={element.name} 
    spots={element.spots} 
    selected={element.name === props.value}
    setDay={props.onChange}  
    />
  );

  return (
    <ul>
      {list}
    </ul>
  );
}