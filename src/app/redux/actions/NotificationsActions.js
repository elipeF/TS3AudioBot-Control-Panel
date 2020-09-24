
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";




export const newNotification = (data) => dispatch => {
    dispatch({
        type: ADD_NOTIFICATION,
        payload: data
    });
};

export const removeNotification = () => dispatch => {
    dispatch({
        type: REMOVE_NOTIFICATION,
    });
};