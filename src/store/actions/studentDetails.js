
export const SET_STUDENT_DETAILS = 'SET_STUDENT_DETAILS';

export const setStudentDetails = (details) => {
    return {
        type: SET_STUDENT_DETAILS,
        details : details
    }
}