import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ImageListState {
    isLoading: boolean;
    result: string[];
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestImageListAction {
    type: 'REQUEST_IMAGE_LIST';
   
}

interface ReceiveImagListAction {
    type: 'RECEIVE_IMAGE_LIST';
    result: string[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestImageListAction | ReceiveImagListAction ;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestImageList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        fetch(`imageList`).then(response => response.json() as Promise<string[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_IMAGE_LIST', result: data });
                });

        dispatch({ type: 'REQUEST_IMAGE_LIST' });
        }
}



// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ImageListState = { result: [], isLoading: false };

export const reducer: Reducer<ImageListState> = (state: ImageListState | undefined, incomingAction: Action): ImageListState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_IMAGE_LIST':
            return {
                result:[],
                isLoading: true
            };
        case 'RECEIVE_IMAGE_LIST':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                result: action.result,
                    isLoading: false
                };
    }

    return state;
};
