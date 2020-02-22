
export const SET_DATA_SCANNED = 'SET_DATA_SCANNED'

export const setDataScanned = (data) => {
    return {
        type: SET_DATA_SCANNED,
        data : data //object
    }
}