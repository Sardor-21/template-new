import { dispatch } from "../store";
import * as t from "../types";
const LoadingOff = () => {
  const action = { type: t.LOADINGOFF };
  dispatch(action);
};
const LoadingOn = () => {
  const action = { type: t.LOADINGON };
  dispatch(action);
};
const Loading_components_on = () => {
  const action = { type: t.LOADING_COMPONETS_ON };
  dispatch(action);
};
const Loading_components_off = () => {
  const action = { type: t.LOADING_COMPONETS_OFF };
  dispatch(action);
};
const Register_on = () => {
  dispatch({ type: t.REGISTER_ON });
};
const Register_off = () => {
  dispatch({ type: t.REGISTER_OFF });
};
// blog-action
const Single_blog = (data) => {
  dispatch({ type: t.SINGLE_BLOG, payload: data });
};

export { LoadingOff, LoadingOn, Register_on, Register_off, Single_blog, Loading_components_on, Loading_components_off };
