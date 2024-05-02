const initialState = {
    isMusicPlaying: true,
    isFormVisible: true
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_MUSIC':
        return {
          ...state,
          isMusicPlaying: !state.isMusicPlaying
        };
      case 'TOGGLE_FORM_VISIBILITY':
        return {
          ...state,
          isFormVisible: !state.isFormVisible
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;