"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    uploadImage: function (image, imageName) { return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        var appState = getState();
        fetch("imageUploadCore", {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: image
        }).then(function (response) { return response.json(); })
            .then(function (data) {
            dispatch({ type: 'RECEIVE_IMAGE_UPLOAD', result: data });
        });
        dispatch({ type: 'REQUEST_IMAGE_UPLOAD' });
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { result: "", isLoading: false };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_IMAGE_UPLOAD':
            return {
                result: "",
                isLoading: true
            };
        case 'RECEIVE_IMAGE_UPLOAD':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                result: "upload completed",
                isLoading: false
            };
    }
    return state;
};
//# sourceMappingURL=ImageUpload.js.map