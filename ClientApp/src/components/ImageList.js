"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var ImageListStore = require("../store/ImageList");
var ImageList = function (props) {
    React.useEffect(function () {
        console.log(props.requestImageList());
    }, []);
    var renderSomething = function () {
        return props.result ? props.result.map(function (imageSrc) {
            var result = "..\\images\\" + imageSrc;
            return React.createElement("img", { src: result, width: "500px", style: { "display": "block" } });
        }) : "";
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null, "Hello "),
        renderSomething()));
};
exports.default = react_redux_1.connect(function (state) { return state.imageList; }, // Selects which state properties are merged into the component's props
ImageListStore.actionCreators // Selects which action creators are merged into the component's props
)(ImageList);
//# sourceMappingURL=ImageList.js.map