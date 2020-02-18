
export const SET_LOCATION = 'SET_LOCATION';

export const setLocation = (position) => {
    return {
        type: SET_LOCATION,
        position: position
    };
};