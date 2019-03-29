import React, {Fragment, useState, useRef, useContext} from 'react';
import {Input, FileInput, Radiobutton} from '../form';
import {ImagePreview, Spinner} from '../views';
import {ProductAction} from '../../actions/index';
import {NotificationStore} from '../../stores';
import {toBase64} from '../../utils/helpers';

const defaultState = {
    name: '',
    imageFile: '',
    imageURL: '',
    imageType: 'file',
};

export const ProductSubType = props => {
    const [state, setState] = useState({...defaultState});
    const notificationStore = useContext(NotificationStore);
    const [isFetching, setIsFetching] = useState(false);

    const radioInputs = [{label: 'Select file', value: 'file'}, {label: 'Select URL', value: 'url'}];

    const modalBody = useRef(null);
    const closeButton = useRef(null);
    const resetState = () => {
        setState({...defaultState});
    };

    const backdropClickHandler = e => {
        if (modalBody.current.contains(e.target)) return;
        resetState();
    };

    const saveClickHandler = async () => {
        if (!state.name || (!state.imageFile && !state.imageURL)) return false;
        try {
            setIsFetching(true);
            await ProductAction.addSubCategory(props.groupName, {
                name: state.name,
                image: state.imageType === 'file' ? state.imageFile : state.imageURL,
            });
            notificationStore.addNotification('New product category was successfully added', 'success');
        } catch (error) {
            notificationStore.addNotification('Product category creation failed. Try again', 'danger');
        } finally {
            setIsFetching(false);
            closeButton.current.click();
        }
    };

    const onChangeHandler = async e => {
        const target = e.target;
        let value = e.target.value;
        if (target.name === 'imageFile') {
            const file = target.files[0];
            value = await toBase64(file);
        }
        setState({
            ...state,
            [target.name]: value,
        });
    };

    const onKeyUpHandler = e => {
        if (e.keyCode === 13) {
            saveClickHandler();
            return false;
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#ProductSubTypeModal">
                + Add category
            </button>
            <div className="modal fade" onClick={backdropClickHandler} id="ProductSubTypeModal" tabIndex="-1" role="dialog" aria-labelledby="productTypeLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" ref={modalBody}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="productTypeLabel">
                                Add a new product subcategory
                            </h5>
                        </div>
                        <div className="modal-body text-left">
                            <Input value={state.name} name="name" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Category name" />
                            <Radiobutton inputList={radioInputs} selectedValue={state.imageType} name="imageType" onChange={onChangeHandler} labelText="Category image" />
                            {state.imageType === 'file' ? (
                                <Fragment>
                                    <FileInput name="imageFile" onChange={onChangeHandler} labelText="Image file" />
                                    <ImagePreview file={state.imageFile} />
                                </Fragment>
                            ) : (
                                <Input value={state.imageURL} name="imageURL" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Image URL" />
                            )}
                        </div>
                        <div className="modal-footer justify-content-center">
                            {isFetching && <Spinner size="40px" />}
                            <button type="button" ref={closeButton} onClick={() => resetState()} className="btn btn-secondary ml-auto" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" onClick={saveClickHandler} className="btn btn-primary" disabled={isFetching}>
                                {isFetching ? 'Saving' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
