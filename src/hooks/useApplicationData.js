import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  function updateSpots(newState) {

    let spotsleft = 0
    for (const appt of getAppointmentsForDay(newState, newState.day)) {
      if (!appt.interview) {spotsleft++}
    } 

    const DaysArr = [...newState.days]
    for (let i = 0; i < DaysArr.length; i++) {
      if (DaysArr[i].name === newState.day) {DaysArr[i].spots = spotsleft}
    };
    // alternative: use const DaysArr = state.days.map(d => d.name === state.day ? newDay : d)
    return DaysArr;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        // call function that takes in a newState and returns a revised days array with the correct # of spots in state.days.[currentdayID].spots
        const newDays = updateSpots({...state, appointments})
        //setState with revised properties for appointments and days (i.e. updated spots remaining) 
        setState({...state, appointments, newDays});
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const newDays = updateSpots({...state, appointments})
        setState({...state, appointments, newDays})
      })
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}