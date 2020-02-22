import { SET_DATA_SCANNED } from "../actions/dataScanned";

const initialDataScannedState = {
    teacherName: '',
    eventName:'',
    eventDate: '',
    eventSecretScanned: ''
}

const dataScannedReducer = (state = initialDataScannedState, action) => {
    switch (action.type) {
        case SET_DATA_SCANNED:
            return {
                ...state,
                teacherName: action.data.teacherName,
                eventName: action.data.eventName,
                eventDate: action.data.eventDate,
                eventSecretScanned: action.data.eventSecretScanned
            }
        default:
            return state
    }
}

export default dataScannedReducer;