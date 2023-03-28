const initialState = {
    username: '',
    password: '',
    isAuth: false,
    error: false
}

export const actions = {
    NAME: 'NAME',
    PASSWORD: 'PASSWORD',
    ISAUTH: 'ISAUTH',
    ERROR: 'ERROR',
}

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.NAME:
            return {...state, username: action.payload}
        case actions.PASSWORD:
            return {...state, password: action.payload}
        case actions.ISAUTH:
            return {...state, isAuth: action.payload}
        case actions.ERROR:
            return {...state, error: action.payload}
        default:
            return  state
    }
}