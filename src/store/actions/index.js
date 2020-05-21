import {CLICK_UPDATE, VISIT_REGISTER, USER_LOGGED_IN, USER_LOGGED_OUT} from './actionsTypes'

export const clickButton = lembretes => ({
  type: CLICK_UPDATE,
  payload: lembretes
})

export const visitRegister = (event) => ({
  type: VISIT_REGISTER,
  payload: event.target.value
})

export const LoggedIn = user => ({
  type: USER_LOGGED_IN,
  payload: user
})

export const LoggedOut = () => ({
  type: USER_LOGGED_OUT,
})
