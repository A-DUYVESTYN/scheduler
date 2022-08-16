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
    console.log("state:", newState)
   
    let spotsleft = 0
    for (const appt of getAppointmentsForDay(newState, newState.day)) {
      if (!appt.interview) {spotsleft = spotsleft + 1}
    } 

    const DaysArr = [...newState.days]
    for (let i = 0; i < DaysArr.length; i++) {
      const element = DaysArr[i];
      if (element.name === newState.day) {DaysArr[i].spots = spotsleft}
    };
    console.log(`spots left on ${newState.day} based on state.appontments= `, spotsleft)

    return DaysArr;
  };

  function bookInterview(id, interview) {
    console.log("bookInterview:", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //  update the database with new appointment. Dont need useEffect to manage this side-effect since it's a single put request, and the user can only access it by clicking new booking, fill out form, click save
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        console.log("PUT response:", res)
        // call fn to return a revised days array with the correct # of spots in state.days.[currentdayID].spots
        const newDays = updateSpots({...state, appointments})
        //setState with revised properties for appointments and days (i.e. spots) 
        setState({...state, appointments, newDays});
      })
  }

  function cancelInterview(id) {
    console.log("cancelInterview id:", id);
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
        console.log("DELETE response:", res)
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