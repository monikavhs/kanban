export const ADD_TASK = 'ADD_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const moveTask = (payload) => ({
  type: MOVE_TASK,
  payload,
});

export const DeleteTask = (payload) => ({
  type: DELETE_TASK,
  payload,
});
