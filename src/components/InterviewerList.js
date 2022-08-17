import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList(props) {

  const list = props.interviewers.map(element => 
    <InterviewerListItem 
    key={element.id}
    name={element.name} 
    avatar={element.avatar}
    selected={element === props.interviewer}
    setInterviewer={() => props.onChange(element)}
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{list}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};