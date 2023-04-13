import { Droppable } from "react-beautiful-dnd";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import KanbanTask from './KanbanTask';

const useStyles = makeStyles({
    columnHeader: {
        textTransform: "uppercase",
        marginBottom: "20px"
    },
    droppableStyles: {
        padding: "10px",
        borderRadius: "6px",
        background: "#d4d4d4",
    }
  });

const KanbanColumn = ({id, tasks, title }) => {

    const classes = useStyles();

    return (
        <div className={classes.droppableStyles}>
            <div className={classes.columnHeader}>{title}</div>
            <Droppable droppableId={`${id}`}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((item, index) => (
                    <KanbanTask key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
                </div>
            )}
            </Droppable>
        </div>)
};

export default KanbanColumn;

