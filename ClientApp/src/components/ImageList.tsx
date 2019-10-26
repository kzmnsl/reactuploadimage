import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';

import * as ImageListStore from '../store/ImageList';
type ImageListProps =
    ImageListStore.ImageListState // ... state we've requested from the Redux store
    & typeof ImageListStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

const ImageList=(props: ImageListProps) => {

    React.useEffect(() => {
        console.log(props.requestImageList());
    }, []);


    const renderSomething = () => {
        return props.result ? props.result.map((imageSrc) => {
            let result = "..\\images\\" + imageSrc;
            return <img src={result} width="500px" style={{ "display": "block" }} />
        }) : ""; 
    }

    return (
        <React.Fragment>
        <div>Hello </div>
            {renderSomething()}
            </React.Fragment>
        )

}
export default connect(
    (state: ApplicationState) => state.imageList, // Selects which state properties are merged into the component's props
    ImageListStore.actionCreators // Selects which action creators are merged into the component's props
)(ImageList as any);