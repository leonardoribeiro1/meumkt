// actions
import {
    USER_LOGGED_IN,
  } from '../actions/actionsTypes'
  
  const initialState = {
      email: 'teste@teste.com',
      name: 'Teste - 901',
      tipo: 'Morador',
      condominio: 'Condominio Montserrat',
    };
    export const userReducer = (state = initialState, action) => {
      switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                tipo: action.payload.tipo,
                condominio: action.payload.condominio,
              };
          case USER_LOGGED_IN:
            return {
                ...initialState,
            };
        default:
          return state;
      }
    };