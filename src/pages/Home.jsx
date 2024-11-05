import { useState } from "react";

import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { TextField, Box, Button } from "@mui/material";
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
  const [taskTitle, setTaskTitle] = useState("");

  const taskChangeHdlr = (event) => {
    console.log(event.target.value);
    setTaskTitle(event.target.value);
    console.log(taskTitle);
    //inputTask.title = event.target.value;
  };

  const addTask = () => {
    setTasks([...tasks, { title: taskTitle, isCompleted: false, notes: [] }]);
    setTaskTitle("");
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <h3>To Do List</h3>
        </Grid>
        <Grid size={8}>
          <TextField
            id="outlined-password-input"
            label="Enter task here"
            type="text"
            fullWidth
            value={taskTitle}
            onChange={taskChangeHdlr}
            color="primary"
          />
        </Grid>
        <Grid size={4}>
          <Button variant="outlined" onClick={addTask}>
            Add a task
          </Button>
        </Grid>
        <Grid size={12}>
          <List>
            {tasks.map((task, index) => (
              <ListItem key={index}>{task.title}</ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};
