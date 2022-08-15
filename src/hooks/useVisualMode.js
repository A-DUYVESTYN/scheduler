import { useState } from "react";

export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
  // console.log("INITIAL HISTORY:",history)

  function transition (newMode, replace = false) {
    // console.log("HISTORY in TRANSITION:", history, "  REPLACE:", replace)
    setMode(newMode);
    !replace && setHistory(prev => [...prev, newMode]);
    replace && setHistory(prev => [...prev.slice(0,prev.length - 1), newMode]);
  }

  function back () {
    // console.log("HISTORY in BACK:", history)
     if (history.length > 1) {
       setMode(history[history.length-2])
       setHistory(prev => prev.slice(0,prev.length - 1));
     }
  }

  return {mode, transition, back};
};