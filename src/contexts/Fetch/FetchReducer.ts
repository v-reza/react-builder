export const FetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD":
      return [
        /// remove duplicate item,
        ...state.filter(
          (item: any) => item.resource !== action.payload.resource
        ),
        {
          resource: action.payload.resource,
          data: action.payload.data,
        },
      ];
    case "UPDATE":
      return [
        ...state.filter(
          (item: any) => item.resource !== action.payload.resource
        ),
        {
          resource: action.payload.resource,
          data: action.payload.data,
        },
      ];
    default:
      return state;
  }
};
