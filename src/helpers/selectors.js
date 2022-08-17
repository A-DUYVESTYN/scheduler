// return an array of appointment objects only for the given day
export function getAppointmentsForDay(state, day) {
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      return dayObj.appointments.map(id => state.appointments[id])
    }
  }
  return []  
}

export function getInterviewersForDay(state, day) {
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      return dayObj.interviewers.map(id => state.interviewers[id])
    }
  }
  return []  
}

export function getInterview(state, interview) {
  const output = interview ? 
  {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  } :
  null;

  return output
}
