export const initState = {
  data: [],
  loading: true,
};

//For Context Api
export const reducer = (state, action) => {
  if (action.type == "ADD_DATA") {
    return {
      ...state,
      data: action.payload,
    };
  }

  if (action.type == "SET_LOADING") {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
};

//For Redux
// export const reducer = (state = initState, action) => {
//   if (action.type == "ADD_DATA") {
//     return {
//       ...state,
//       data: action.payload,
//     };
//   }

//   if (action.type == "SET_LOADING") {
//     return {
//       ...state,
//       loading: action.payload,
//     };
//   }

//   return state;
// };
