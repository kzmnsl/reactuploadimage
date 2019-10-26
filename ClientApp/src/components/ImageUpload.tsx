import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as ImageUploadStore from '../store/ImageUpload';
// At runtime, Redux will merge together...
type ImageUploadProps =
    ImageUploadStore.ImageUploadState // ... state we've requested from the Redux store
    & typeof ImageUploadStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters

const ImageUpload = (props: ImageUploadProps) => {
    const [file, setFile] = React.useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string | ArrayBuffer | undefined>("");

    const handleSubmit = (e: any): void => {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', file);
        let form = new FormData();
        form.append('image', file);
        props.uploadImage(form, "deneme");
    }
    const handleImageChange = (e: any): void => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setFile(file);
            if (reader.result) {

                setImagePreviewUrl(reader.result);
            }
        };

        reader.readAsDataURL(file)
    }

    const renderImagePreview = () => {
        return (
            imagePreviewUrl ? <img width="300px" src={imagePreviewUrl as string} /> : ""
            );
    }

    return (
        <div className="previewComponent">
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="fileInput"
                    type="file"
                    onChange={(e) => handleImageChange(e)} />
                <button className="submitButton"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}>Upload Image</button>
            </form>
            <div className="imgPreview">
                {renderImagePreview()}
            </div>
        </div>
    )
}

export default connect(
    (state: ApplicationState) => state.imageUpload, // Selects which state properties are merged into the component's props
    ImageUploadStore.actionCreators // Selects which action creators are merged into the component's props
)(ImageUpload as any);
