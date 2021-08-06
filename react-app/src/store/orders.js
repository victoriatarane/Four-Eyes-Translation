const SET_ORDERS = 'orders/SET_ORDERS';
const SET_TRANSLATION = 'orders/SET_TRANSLATION';
const SET_COPYWRITING = 'orders/SET_COPYWRITING';
const SET_PROOFREADING = 'orders/SET_PROFFREADING';

const ADD_TRANSLATION = 'orders/ADD_TRANSLATION';
const ADD_COPYWRITING = 'orders/ADD_COPYWRITING';
const ADD_PROOFREADING = 'orders/ADD_PROFFREADING';

const EDIT_TRANSLATION = 'orders/EDIT_TRANSLATION';
const EDIT_COPYWRITING = 'orders/EDIT_COPYWRITING';
const EDIT_PROOFREADING = 'orders/EDIT_PROFFREADING';

const DELETE_TRANSLATION = 'orders/DELETE_TRANSLATION';
const DELETE_COPYWRITING = 'orders/DELETE_COPYWRITING';
const DELETE_PROOFREADING = 'orders/DELETE_PROFFREADING';

const setOrders = (orders) => ({
    type: SET_ORDERS,
    payload: orders
});

const setTranslation = (translation) => ({
    type: SET_TRANSLATION,
    payload: translation
});

const setCopywriting = (copy) => ({
    type: SET_COPYWRITING,
    payload: copy
});

const setProofreading = (proofreading) => ({
    type: SET_PROOFREADING,
    payload: proofreading
});

const createTranslation = (translation) => ({
    type: ADD_TRANSLATION,
    payload: translation
});

const createProofreading = (proofreading) => ({
    type: ADD_PROOFREADING,
    payload: proofreading
});

const createCopywriting = (copywriting) => ({
    type: ADD_COPYWRITING,
    payload: copywriting
});

const updateTranslation = (translation) => ({
    type: EDIT_TRANSLATION,
    payload: translation
});

const updateProofreading = (proofreading) => ({
    type: EDIT_PROOFREADING,
    payload: proofreading
});

const updateCopywriting = (copywriting) => ({
    type: EDIT_COPYWRITING,
    payload: copywriting
});

const removeTranslation = (translationId) => ({
    type: DELETE_TRANSLATION,
    payload: translationId
});

const removeProofreading = (proofreadingId) => ({
    type: DELETE_PROOFREADING,
    payload: proofreadingId
});

const removeCopywriting = (copywritingId) => ({
    type: DELETE_COPYWRITING,
    payload: copywritingId
});

export const getOrders = (userId) => async (dispatch) => {
    const response = await fetch(`/api/orders/all/${userId}`)
    if (response.ok) {
        const orders = await response.json();
        dispatch(setOrders(orders))
    }
}

export const getTranslation = () => async (dispatch) => {
    const response = await fetch(`/api/translations`)
    if (response.ok) {
        const translations = await response.json();
        dispatch(setTranslation(translations));
    } else {
        return [`An error occurred. Please try again.`]
    }
}

export const getProofreading = () => async (dispatch) => {
    const response = await fetch(`/api/proofreadings`)
    if (response.ok) {
        const proofreadings = await response.json();
        dispatch(setProofreading(proofreadings));
    } else {
        return [`An error occurred. Please try again.`]
    }
}

export const getCopywriting = () => async (dispatch) => {
    const response = await fetch(`/api/copywritings`)
    if (response.ok) {
        const copy = await response.json();
        dispatch(setCopywriting(copy));
    } else {
        return [`An error occurred. Please try again.`]
    }
}

export const addTranslation = (formData) => async (dispatch) => {
    const response = await fetch(`/api/translations/create`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: formData
    })
    if (response.ok) {
        const newTranslation = await response.json();
        dispatch(createTranslation(newTranslation));
        // return newTranslation;
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

export const addProofreading = (formData) => async (dispatch) => {
    const response = await fetch(`/api/proofreadings/create`, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: formData
    })
    if (response.ok) {
        const newProofreading = await response.json();
        dispatch(createProofreading(newProofreading));
        // return newProofreading;
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

export const addCopywriting = (copywriting) => async (dispatch) => {
    const response = await fetch(`/api/copywritings/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(copywriting)
    })
    if (response.ok) {
        const newCopywriting = await response.json();
        dispatch(createCopywriting(newCopywriting));
        // return newCopywriting;
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

export const editTranslation = (payload) => async (dispatch) => {
    const translationId = payload.id;
    const translation = payload;
    const response = await fetch(`/api/translations/${translationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateTranslation(data))
        if (data.errors) {
            return;
        }
    }
}
export const editProofreading = (payload) => async (dispatch) => {
    const proofreadingId = payload.id;
    const proofreading = payload;
    const response = await fetch(`/api/proofreadings/${proofreadingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateProofreading(data))
        if (data.errors) {
            return;
        }
    }
}
export const editCopywriting = (payload) => async (dispatch) => {
    const copywritingId = payload.id;
    const copywriting = payload;
    const response = await fetch(`/api/copywritings/${copywritingId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateCopywriting(data))
        if (data.errors) {
            return;
        }
    }
}

export const deleteTranslation = (translation) => async (dispatch) => {
    const response = await fetch(`/api/translations/${translation.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateCopywriting(data))
        if (data.errors) {
            return;
        }
    }
}
export const deleteProofreading = (proofreading) => async (dispatch) => {
    const response = await fetch(`/api/proofreadings/${proofreading.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeProofreading(proofreading.id));
    }
}
export const deleteCopywriting = (copywriting) => async (dispatch) => {
    const response = await fetch(`/api/copywritings/${copywriting.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(removeCopywriting(copywriting.id));
    }
}


const initialState = {};
let index;

export default function reducer(state=initialState, action) {
    let newState;
    switch (action.type) {
        case SET_ORDERS:
            newState = {...state};
            action.payload.forEach((order) => {
                newState[order.id] = order;
            });
            return newState;
        case SET_TRANSLATION:
            newState = {...state};
            action.payload.forEach((translation) => {
                newState[translation.id] = translation;
            });
            return newState;
        case SET_COPYWRITING:
            newState = { ...state };
            action.payload.forEach((copy) => {
                newState[copy.id] = copy;
            });
            return newState;
        case SET_PROOFREADING:
            newState = { ...state };
            action.payload.forEach((proofreading) => {
                newState[proofreading.id] = proofreading;
            });
            return newState;
        case ADD_TRANSLATION:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case ADD_PROOFREADING:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case ADD_COPYWRITING:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_TRANSLATION:
            newState = {...state};
            newState.translation = [...state.translation];
            // newState[action.payload.id] = action.payload;
            index = newState.translation.findIndex((translation) => translation.id === action.payload.id)
            newState.translation.splice(index, 1, action.payload)
            return newState;
        case EDIT_PROOFREADING:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_COPYWRITING:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_TRANSLATION:
            newState = { ...state };
            newState.translation = [...state.translation];
            index = newState.translation.findIndex((translation) => translation.id === action.payload.id)
            newState.translation.splice(index, 1)
            return newState;
        case DELETE_PROOFREADING:
            newState = { ...state };
            newState.proofreading = [...state.proofreading];
            index = newState.proofreading.findIndex((proofreading) => proofreading.id === action.payload.id)
            newState.proofreading.splice(index, 1)
            return newState;
        case DELETE_COPYWRITING:
            newState = { ...state };
            newState.copywriting = [...state.copywriting];
            index = newState.copywriting.findIndex((copywriting)=>copywriting.id === action.payload.id)
            newState.copywriting.splice(index, 1)
            return newState;
        default: 
            return state;
    }
}