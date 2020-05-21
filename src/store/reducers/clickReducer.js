// actions
import {
  CLICK_UPDATE,
  VISIT_REGISTER,
} from '../actions/actionsTypes'

const initialState = {
    id: '111',
    tipo: 'MODELO',
  };
  export const clickReducer = (state = initialState, action) => {
    switch (action.type) {
      case CLICK_UPDATE:
        return {
          ...state,
          id: action.payload.id,
          tipo: action.payload.tipo,
        };
      default:
        return state;
    }
  };