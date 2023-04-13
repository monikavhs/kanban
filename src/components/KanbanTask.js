import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from "react-beautiful-dnd";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { DeleteTask } from '../store/actions/task_action';

const useStyles = makeStyles({
    dragItem: {
        padding: "10px",
        borderRadius: "6px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        background: "white",
        margin: "0 0 8px 0",
        display: "grid",
        gridGap: "20px",
        flexDirection: "column",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    cardHeader: {
        fontWeight: 500
    },
    cardContent: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
  });

const KanbanTask = ({ item, index }) => {
  const classes = useStyles();
  const dispatch = useDispatch();


  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className={classes.dragItem}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={classes.cardContainer}>
            <div className={classes.cardHeader}>{item?.title}</div>
            <div>
            <IconButton title='Delete the task' onClick={() => dispatch(DeleteTask(item))}>
                          <CloseIcon color='red' />
                    </IconButton>
            </div>
            </div>
            <div className={classes.cardContent}>
              <span>{item.content}</span>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default KanbanTask;
