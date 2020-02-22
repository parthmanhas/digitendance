import { SET_STUDENT_DETAILS } from '../actions/studentDetails';

const initialStudentState = {
    name: '',
    regNumber: '',
    time: '',
    comment: ''
}

const studentDetailsReducer = (state = initialStudentState, action) => {
    switch (action.type) {
        case SET_STUDENT_DETAILS:
            return {
                ...state,
                name: action.details.name ? action.details.name : state.name,
                regNumber: action.details.regNumber ? action.details.regNumber : state.regNumber,
                time: action.details.time ? action.details.time : state.time,
                comment: action.details.comment ? action.details.comment : state.comment
            }
        default:
            return state;
    }
}

export default studentDetailsReducer;