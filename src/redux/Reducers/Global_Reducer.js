import * as t from "../types";

const initialState = {
  loading: true,
  loading_components: false,
  register: false,
  single_blog: [],
};

const Global_Reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.LOADINGOFF:
      return { ...state, loading: false };
    case t.LOADINGON:
      return { ...state, loading: true };
    case t.LOADING_COMPONETS_ON:
      return { ...state, loading_components: true };
    case t.LOADING_COMPONETS_OFF:
      return { ...state, loading_components: false };
    case t.REGISTER_ON:
      return { ...state, register: true };
    case t.REGISTER_OFF:
      return { ...state, register: false };
    case t.SINGLE_BLOG:
      return { ...state, single_blog: action.payload };

    default:
      return state;
  }
};

export default Global_Reducer;
