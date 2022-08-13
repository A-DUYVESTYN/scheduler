// return an array of appointment objects only for the given day
export function getAppointmentsForDay(state, day) {
  // console.log("///////// day:", day,"state:", state)
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      // console.log("&&&&&&&&&&& dayObj:", dayObj)
      // console.log(dayObj.appointments.map(id => state.appointments[id]))
      return dayObj.appointments.map(id => state.appointments[id])
    }
  }
  return []  
}

export function getInterviewersForDay(state, day) {
  // console.log("///////// day:", day,"state:", state)
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      // console.log("&&&&&&&&&&& dayObj:", dayObj)
      // console.log(dayObj.appointments.map(id => state.appointments[id]))
      return dayObj.interviewers.map(id => state.interviewers[id])
    }
  }
  return []  
}

export function getInterview(state, interview) {
  // console.log("///////// interview:", interview)
  // console.log("&&&&&&&&& state:", state)
  const output = interview ? 
  {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  } :
  null;

  return output
}
// getInterview RETURN OBJ SHOULD LOOK LIKE THIS:
// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }