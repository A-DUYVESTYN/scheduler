import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByPlaceholderText, queryByText } from "@testing-library/react";
import { getByText, prettyDOM, getAllByTestId, getByAltText } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);

describe("application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"))
        expect(getByText(/Leopold Silvers/i)).toBeInTheDocument();
      })

  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(appointment, /Lydia Miller-Jones/i)).toBeInTheDocument()
    expect(getByAltText(appointment, /edit/i)).toBeInTheDocument()

    // console.log(debug())

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument()
    // console.log(prettyDOM(day))

  })

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appt => queryByText(appt, "Archie Cohen"));
    // console.log(prettyDOM(appointment))
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you wish to delete?")).toBeInTheDocument()
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, `Deleting :(`)).toBeInTheDocument()

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // console.log(prettyDOM(day))
    expect(getByText(day, `2 spots remaining`)).toBeInTheDocument()
    // console.log(debug())
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // console.log(prettyDOM(container))
    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appt => queryByText(appt, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. type a new name
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archie-replacement name" }
    });
    // 5. Click the "Save" button on the confirmation.
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /saving/i)).toBeInTheDocument()
    // 7. Wait until the updated element is displayed.
    await waitForElement(() => getByText(appointment, "Archie-replacement name"));
    // console.log(prettyDOM(appointment))
    // 8. Check that the element has the updated name
    expect(getByText(appointment, "Archie-replacement name")).toBeInTheDocument()
    // 9. Check the spots did not change for "Monday"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, `1 spot remaining`)).toBeInTheDocument()
    // console.log(debug())
  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, /saving/i)).toBeInTheDocument()

    await waitForElement(() => getByText(appointment, "Error"));
  
    // console.log(prettyDOM(appointment))
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument()

    // console.log(debug())
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appt => queryByText(appt, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you wish to delete?")).toBeInTheDocument()
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    await waitForElement(() => getByText(appointment, "Error"));
    // console.log(prettyDOM(appointment))
    expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument()

    // console.log(debug())
  });

})
