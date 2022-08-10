import React, { useState } from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
    // const [interviewer, setInterviewer] = useState("");

  const list = props.interviewers.map(element => 
    <InterviewerListItem 
    key={element.id}
    name={element.name} 
    avatar={element.avatar}
    selected={element.id === props.value} // differs from code given on compass. value, vs props.value
    setInterviewer={() => props.onChange(element.id)}  // differs from code given on compass w onChange, vs props.onChange
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>
  );
}