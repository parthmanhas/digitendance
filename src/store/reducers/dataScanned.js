import { SET_DATA_SCANNED } from "../actions/dataScanned";

const initialDataScannedState = {
    teacherName: '',
    eventName: '',
    eventDate: '',
    eventSecret: '',
    eventTime: '',
    eventExpiryTime: '',
    eventType: ''
}

const dataScannedReducer = (state = initialDataScannedState, action) => {
    switch (action.type) {
        case SET_DATA_SCANNED:
            return {
                ...state,
                teacherName: action.data.teacherName,
                eventName: action.data.eventName,
                eventDate: action.data.eventDate,
                eventSecret: action.data.eventSecret,
                eventTime: action.data.eventTime,
                eventExpiryTime: action.data.eventExpiryTime,
                eventType: action.data.eventType
            }
        default:
            return state
    }
}

export default dataScannedReducer;