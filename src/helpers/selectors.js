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