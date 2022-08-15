import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

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
    //  update the database with new appointment. Dont need useEffect to manage this side-effect since it is a single put request, and the user can access it by clicking new booking, fill out form, click save
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        console.log(res)
        setState({
          ...state,
          appointments
        });
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
        console.log("delete response:", res)
        setState({...state, appointments})
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