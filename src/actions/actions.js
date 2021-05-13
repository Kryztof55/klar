import * as actionTypes from "./actionTypes";

const setUsers = (users) => {
  console.log(users);
  return {
    type: actionTypes.SET_USERS_TO_STATE,
    users,
  };
};

export { setUsers };
