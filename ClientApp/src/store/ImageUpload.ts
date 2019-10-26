import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ImageUploadState {
    isLoading: boolean;
    result: string;
}

export interface ImageUpload {
    result: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestImageUploadAction {
    type: 'REQUEST_IMAGE_UPLOAD';
   
}

interface ReceiveImageUploadAction {
    type: 'RECEIVE_IMAGE_UPLOAD';
    result: ImageUpload;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestImageUploadAction | ReceiveImageUploadAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    uploadImage: (image: any,imageName:string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        fetch(`imageUploadCore`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: 
                image
        }).then(response => response.json() as Promise<ImageUpload>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_IMAGE_UPLOAD', result: data });
                });

        dispatch({ type: 'REQUEST_IMAGE_UPLOAD' });
        }
}



// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: ImageUploadState = { result: "", isLoading: false };

export const reducer: Reducer<ImageUploadState> = (state: ImageUploadState | undefined, incomingAction: Action): ImageUploadState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_IMAGE_UPLOAD':
            return {
                result:"",
                isLoading: true
            };
        case 'RECEIVE_IMAGE_UPLOAD':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                result:"upload completed",
                    isLoading: false
                };
    }

    return state;
};
