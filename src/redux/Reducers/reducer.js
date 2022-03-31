import * as t from "../types";

const initialState = {
    userdata: "",
    testLessonData: [],
    teacher_of_students: "",
    top_teacher_list: [],
    home_category_list_id: [],
    courses_filter: [],
    teacher_blogs: [],
    courses_list: [],
    blog_category: [],
    student_test_lesson: [],
    teacher_single_student: {}
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.USERDATA:
            return {...state, userdata: action.payload, loading: false};
        case t.CLEARDATA:
            return {...state, userdata: ""};
        case t.TEST_LESSON_DATA:
            return {...state, testLessonData: action.payload};
        case t.TEACHER_STUDENTS:
            return {...state, teacher_of_students: action.payload};
        case t.TOP_TEACHER_LIST:
            return {...state, top_teacher_list: action.payload};
        case t.COURSES_LIST:
            return {...state, courses_list: action.payload};
        case t.HOME_CATEGORY_LIST_ID:
            return {
                ...state,
                home_category_list_id: action.payload,
            };
        case t.COURSES_FILTER:
            return {...state, courses_filter: action.payload};
        case t.TEACHER_BLOGS:
            return {...state, teacher_blogs: action.payload};
        case t.BLOG_CATEGORY:
            return {...state, blog_category: action.payload};

        case t.STUDENTS_TEST_LESSON:
            return {...state, student_test_lesson: action.payload}
        case t.TEACHER_SINGLE_STUDENT:
            return {...state, teacher_single_student: action.payload}
        default:
            return state;
    }
};

export default Reducer;
