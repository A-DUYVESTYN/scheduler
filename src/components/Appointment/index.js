import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";



export default function Appointment(props) {

  return (

    <article className="appointment">
      <Header time={props.time}></Header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>}
    </article>
  );
}