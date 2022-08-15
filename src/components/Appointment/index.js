import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  // if there is an interview, use SHOW mode, use EMPTY mode to display a gap in the schedule. useVisualMode returns the mode state, and the two functions
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then (() => {
        transition(SHOW);
      })
  }




  function deleteInterview() {

    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
  }



  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}

        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting :("/>}
      {mode === CONFIRM && 
        <Confirm 
          message="Are you sure you wish to delete?"
          onCancel={() => transition(SHOW)}
          onConfirm={deleteInterview}/>}
    </article>
  );
}