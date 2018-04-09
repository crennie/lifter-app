
async function callApi(api_url) {
  console.log(`TRYING TO CALL URL "${api_url}"`);
  const response = await fetch(api_url);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
}
/*
const initialState = {
  request_in_progress = null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      }

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      }

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
      }

    default:
      return state
  }
}
*/

export default {
  callApi,

  getMeets: async() => callApi('/api/meets'),
  getLifters: async() => callApi('/api/lifters')
}
