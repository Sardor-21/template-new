import { combineReducers } from "redux";
import Reducer from "./reducer";
import admin_reducer from "./admin_reducer";
import Global_Reducer from "./Global_Reducer";

const RootReducer = combineReducers({
  Reducer,
  Admin: admin_reducer,
  Global: Global_Reducer,
});

export default RootReducer;
