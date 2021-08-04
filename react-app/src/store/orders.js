const SET_TRANSLATION = 'orders/SET_TRANSLATION';
const SET_COPYWRITING = 'orders/SET_COPYWRITING';
const SET_PROOFREADING = 'orders/SET_PROFFREADING';

const ADD_TRANSLATION = 'orders/ADD_TRANSLATION';
const ADD_COPYWRITING = 'orders/ADD_COPYWRITING';
const ADD_PROFFREADING = 'orders/ADD_PROFFREADING';

const EDIT_TRANSLATION = 'orders/EDIT_TRANSLATION';
const EDIT_COPYWRITING = 'orders/EDIT_COPYWRITING';
const EDIT_PROFFREADING = 'orders/EDIT_PROFFREADING';

const DELETE_TRANSLATION = 'orders/DELETE_TRANSLATION';
const DELETE_COPYWRITING = 'orders/DELETE_COPYWRITING';
const DELETE_PROFFREADING = 'orders/DELETE_PROFFREADING';


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
    const response = await fetch(`/api/proofreading`)
    if (response.ok) {
        const proofreadings = await response.json();
        dispatch(setProofreading(proofreadings));
    } else {
        return [`An error occurred. Please try again.`]
    }
}

export const getCopywriting = () => async (dispatch) => {
    const response = await fetch(`/api/copy`)
    if (response.ok) {
        const copy = await response.json();
        dispatch(setTranslation(copy));
    } else {
        return [`An error occurred. Please try again.`]
    }
}

export const addTranslation = (translation) => async (dispatch) => {
    const response = await fetch(`/api/translations/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(translation)
    })
    if (response.ok) {
        const newTranslation = await response.json();
        dispatch(createTranslation(newTranslation));
        return newTranslation;
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

export const addProofreading = (proofreading) => async (dispatch) => {
    const response = await fetch(`/api/proofreadings/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proofreading)
    })
    if (response.ok) {
        const newProofreading = await response.json();
        dispatch(createTranslation(newProofreading));
        return newProofreading;
    }
    else {
        return ['An error occurred. Please try again.']
    }
}

const initialState = {}

export default function reducer(state=initialState, action) {
    let newState;
    switch (action.type) {
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
        default: 
            return state;
    }
}