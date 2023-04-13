import { createStore } from 'redux';
import taskReducer from './reducers/task_reducer';

const store = createStore(taskReducer);

export default store;
