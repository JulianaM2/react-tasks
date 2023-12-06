import { render, screen, fireEvent } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import Task from "./Task";
import taskStore from "../../../store/task";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../../store/task", () => ({
  initialState: {},
  subscribe: jest.fn(),
  init: jest.fn(),
  deleteTask: jest.fn(),
}));

const taskMock = {
  title: "Test task",
  description: "Description mock",
  dueDate: "2024-10-08",
  stateHistory: [{ state: "new", date: "2023-12-03" }],
  notes: ["Note mock"],
};

describe("Task", () => {
  const locationMock = { state: taskMock };

  beforeEach(() => {
    useLocation.mockReturnValue(locationMock);
  });

  test("should render the task details", () => {
    render(<Task />);

    const titleTask = screen.getByText("Test task");
    const dueDateTask = screen.getByText("Due date: 2024-10-08");

    expect(titleTask).toBeInTheDocument();
    expect(dueDateTask).toBeInTheDocument();
  });

  test("should call the navigate with root path", () => {
    render(<Task />);

    const deleteButton = screen.getByText("Delete");
    fireEvent(
      deleteButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(taskStore.deleteTask).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("should call the navigate with /task/create path", () => {
    render(<Task />);

    const editButton = screen.getByText("Edit");
    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/task/create", locationMock);
  });
});
