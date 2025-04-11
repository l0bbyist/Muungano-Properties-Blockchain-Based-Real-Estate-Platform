import {
  ADD_ROLE_REQUEST,
  REMOVE_ROLE_REQUEST,
  ROLE_CHANGED,
  SET_CONTRACT_INSTANCE,
} from "./constants";

export function setContractInstance(instance) {
  return {
    type: SET_CONTRACT_INSTANCE,
    payload: instance,
  };
}


export function addRoleRequest(data) {
  return {
    type: ADD_ROLE_REQUEST,
    payload: data,
  };
}

export function removeRoleRequest(data) {
  return {
    type: REMOVE_ROLE_REQUEST,
    payload: data,
  };
}

export function roleChanged() {
  return {
    type: ROLE_CHANGED,
  };
}