import { useState, useEffect } from "react";
import { Form, Row, Container, Col, Button, ListGroup } from "react-bootstrap";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState({
    id: 0,
    title: "",
    isCompleted: false,
    notes: [],
    dueDate: "",
    isPriority: false,
    priorityNo: null,
  });

  const addTask = () => {
    setTasks((oldTasks) => {
      return [
        ...oldTasks,
        { ...task, id: crypto.randomUUID(), title: task.title },
      ];
    });
    setTask({
      id: 0,
      title: "",
      isCompleted: false,
      notes: [],
      dueDate: "",
      isPriority: false,
      priorityNo: null,
    });
  };

  const onTaskSubmit = (e) => {
    e.preventDefault();
  };

  const taskCompleted = (e, tsk) => {
    setTasks((oldtasks) => {
      let newTasks = oldtasks.map((item) => {
        if (item.id === tsk.id) {
          return { ...item, isCompleted: e.target.checked };
        } else {
          return item;
        }
      });

      return newTasks;
    });
  };

  const updateTaskHandler = () => {
    const updatedTodos = tasks.filter((item) => item.isCompleted === false);
    setTodos(updatedTodos);
    const newCompletedTasks = tasks.filter((item) => item.isCompleted === true);
    setCompletedTasks(newCompletedTasks);
  };

  console.log("tasks : " + JSON.stringify(tasks));
  console.log("completedTasks : " + JSON.stringify(completedTasks));

  useEffect(() => {
    updateTaskHandler();
  }, [tasks]);
  return (
    <>
      <Form onSubmit={onTaskSubmit}>
        <Container fluid>
          <Row>
            <Col xs={10}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  value={task.title}
                  placeholder="Enter a task here"
                  onChange={(e) => {
                    setTask({ ...task, title: e.target.value });
                  }}
                />
              </Form.Group>
            </Col>
            <Col xs={2}>
              {" "}
              <Button variant="light" onClick={addTask}>
                Add a task
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <Container>
        {completedTasks && completedTasks?.length != 0 && <h5> To do</h5>}
        <ListGroup>
          {todos.map((item, index) => (
            <ListGroup.Item key={index}>
              {" "}
              <Row key={index}>
                <Col lg={1}>
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id="default-checkbox"
                    label=""
                    checked={item.isCompleted}
                    onChange={(e) => taskCompleted(e, item)}
                  />
                </Col>

                <Col lg={8}> {item.title} </Col>
                <Col lg={3}>
                  <Button variant="outline-secondary">Edit</Button>{" "}
                  <Button variant="outline-secondary">Priority</Button>{" "}
                  <Button variant="outline-secondary">Delete</Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>

      <Container>
        {completedTasks && completedTasks?.length != 0 && (
          <h5> Completed Tasks</h5>
        )}

        <ListGroup>
          {completedTasks.map((item, index) => (
            <ListGroup.Item key={index}>
              {" "}
              <Row key={index}>
                <Col xs={1}>
                  <Form.Check // prettier-ignore
                    type="checkbox"
                    id="default-checkbox"
                    label=""
                    checked={item.isCompleted}
                    onChange={(e) => taskCompleted(e, item)}
                  />
                </Col>
                {item.title}{" "}
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
};
