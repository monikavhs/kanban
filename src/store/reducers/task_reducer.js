import { ADD_TASK, MOVE_TASK, DELETE_TASK } from '../actions/task_action';

const getItems = (count, col) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      column: col.id,
      title: col.name,
      content: `item ${randomId}`
    };
});

const generateLists = (columns) =>
    columns.reduce(
        (acc, col) => ({ ...acc, [col.id]: getItems(3, col) }),
        []
  );

const columns = [
    {
        id: 'todo',
        name: "To Do"
    },
    {
        id: 'inProgress',
        name: "In Progress"
    },
    {
        id: 'done',
        name: "Done"
    },
]

const initialState = {
  columns,
  tasks: generateLists(columns),
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: action.payload,
      };
    case MOVE_TASK:
      return {
        ...state,
        tasks: action.payload
      };
    default:
      return state;
    case DELETE_TASK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.column]: state.tasks[action.payload.column].filter(task => task.id != action.payload.id)
        }
      }
  }
};

export default taskReducer;
