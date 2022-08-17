import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js"
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  // if there is an interview, use SHOW mode, use EMPTY mode to display a gap in the schedule. useVisualMode returns the mode state, and the two functions
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer.id  // changed from how it was shown on compass. Here, interviewer is the entire interviewer object. The API expects only the interviewer's id as an int.
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then (() => {
        transition(SHOW);
      })
      .catch ((err) => {
        console.log(err)
        transition(ERROR_SAVE, true)
      })
  }

  function deleteInterview() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)
      })
      .catch ((err) => {
        console.log(err)
        transition(ERROR_DELETE, true)
      })
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          onCancel={() => transition(SHOW)}
          interviewers={props.interviewers}
          onSave={save}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting :("/>}
      {mode === CONFIRM && 
        <Confirm 
          message="Are you sure you wish to delete?"
          onCancel={() => transition(SHOW)}
          onConfirm={deleteInterview}/>}

      {mode === ERROR_SAVE && <Error message ="Could not save appointment" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message ="Could not delete appointment" onClose={back}/>}
    </article>
  );
}