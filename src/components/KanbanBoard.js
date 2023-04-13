
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanColumn from './KanbanColumn';
import { useSelector, useDispatch } from 'react-redux';
import { moveTask, addTask } from '../store/actions/task_action';
import KanbanAddTask from './KanbanAddTask';

const useStyles = makeStyles({
  dragDropContextContainer: {
    padding: "20px",
    borderRadius: "6px",
  },
  listGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: "8px",
  }
});

function KanbanBoard() {

  const classes = useStyles();
  const columns = useSelector((state) => state.columns);
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };
  
  const addToList = (list, index, item) => {
    const result = Array.from(list);
    result.splice(index, 0, item);
    return result;
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const listCopy = { ...tasks };

    const sourceList = listCopy[source.droppableId];
    let [removedItem, newSourceList] = removeFromList(
      sourceList,
      source.index
    );
    listCopy[source.droppableId] = newSourceList;
    const destinationList = listCopy[destination.droppableId];
    removedItem.column = destination.droppableId;
    listCopy[destination.droppableId] = addToList(
      destinationList,
      destination.index,
      removedItem
    );
    dispatch(moveTask(listCopy));
  };

  const onUpdate = (task) => {

    const allTasks = {...tasks};
    const todoTasks = Array.from(allTasks["todo"]);
    todoTasks.push({
      ...task,
      column: "todo",
      id: "item-"+Date.now()
    })

    dispatch(addTask({
      ...allTasks,
      todo: todoTasks
    }))

  }


  return (
    <Grid>
      <div>

        <KanbanAddTask onUpdate={onUpdate}/>

      </div>
      <div className={classes.dragDropContextContainer}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={classes.listGrid}>
            {columns.map((col) => (
              <KanbanColumn
                tasks={tasks[col.id]}
                id={col.id}
                title={col.name}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </Grid>
  );
}

export default KanbanBoard;
