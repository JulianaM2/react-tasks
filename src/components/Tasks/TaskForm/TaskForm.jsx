import { Formik } from "formik";
import { col } from "../../../styles/global.styles";
import "./TaskForm.css";
import { useLayoutEffect, useMemo, useState } from "react";
import taskStore from "../../../store/task";
import { useNavigate } from "react-router-dom";

const validate = (value, field, errors) => {
  if (!value) {
    errors[field] = "This field is required";
  }
};

const validateNotes = (notes, errors) => {
  if (notes.length === 0) {
    errors.note = "Must have at least one note";
  }
};

const validateTaskForm = (values, notes) => {
  const errors = {};

  validate(values.title, "title", errors);
  validate(values.description, "description", errors);
  validate(values.dueDate, "dueDate", errors);
  validate(values.state, "state", errors);
  validateNotes(notes, errors);

  return errors;
};

const TaskForm = () => {
  const [taskState, setTaskState] = useState({});
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    taskStore.subscribe(setTaskState);
    taskStore.init();
  }, []);

  const taskStates = useMemo(
    () => taskState.taskStates ?? [],
    [taskState.taskStates]
  );

  const handleAddNotes = (noteValue) => setNotes([...notes, noteValue]);

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: "",
          dueDate: "",
          state: "",
          note: "",
        }}
        validate={(values) => validateTaskForm(values, notes)}
        onSubmit={(values) => {
          const task = {
            title: values.title,
            description: values.description,
            dueDate: values.dueDate,
            stateHistory: [{ state: values.state, date: new Date() }],
            notes,
          };

          taskStore.addNote(task);
          navigate("/");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="task-form">
              <div className="row">
                <div style={col(6)}>Title*</div>
                <div style={col(6)}>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                  />
                  <span className="field-required">
                    {errors.title && touched.title && errors.title}
                  </span>
                </div>
              </div>
              <div className="row">
                <div style={col(6)}>Description*</div>
                <div style={col(6)}>
                  <input
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                  />
                  <span className="field-required">
                    {errors.description &&
                      touched.description &&
                      errors.description}
                  </span>
                </div>
              </div>
              <div className="row">
                <div style={col(6)}>Due date*</div>
                <div style={col(6)}>
                  <input
                    type="date"
                    name="dueDate"
                    onChange={handleChange}
                    value={values.dueDate}
                  />
                  <span className="field-required">
                    {errors.dueDate && touched.dueDate && errors.dueDate}
                  </span>
                </div>
              </div>
              <div className="row">
                <div style={col(6)}>State*</div>
                <div style={col(6)}>
                  <select
                    name="state"
                    onChange={handleChange}
                    value={values.state}
                  >
                    <option value="">Select an state*</option>
                    {taskStates.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <span className="field-required">
                    {errors.state && touched.state && errors.state}
                  </span>
                </div>
              </div>
              <div className="row">
                <div style={col(6)}>Note*</div>
                <div style={col(5)}>
                  <input
                    type="text"
                    name="note"
                    onChange={handleChange}
                    value={values.note}
                  />
                  <span className="field-required">
                    {errors.note && touched.note && errors.note}
                  </span>
                </div>
                <div style={col(1)}>
                  <button
                    onClick={() => handleAddNotes(values.note)}
                    className="add-note"
                    disabled={!values.note}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="row">
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
                <button>Cancel</button>
              </div>
              <div className="row">
                <ul>
                  {notes.map((note, index) => (
                    <li key={"note-" + index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;
