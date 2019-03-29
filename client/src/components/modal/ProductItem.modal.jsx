import React, {Fragment, useState, useRef, useContext} from 'react';
import {Input, FileInput, Radiobutton, Textarea} from '../form';
import {ImagePreview, Spinner} from '../views';
import {ProductAction} from '../../actions';
import {toBase64} from '../../utils/helpers';
import {NotificationStore} from '../../stores';

const defaultState = {
    name: '',
    price: '',
    salePrice: '',
    description: '',
    details: '',
    manufacture: '',
    quantity: 1,
    imageFile: '',
    imageURL: '',
    imageType: 'file',
};

export const ProductItem = ({category, subCategory}) => {
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
        const {name, description, price, salePrice, quantity, manufacture, details} = state;
        try {
            setIsFetching(true);
            await ProductAction.addProduct(category, subCategory, {
                name,
                description,
                price,
                salePrice,
                quantity,
                manufacture,
                category,
                subCategory,
                details,
                imageUrl: state.imageType === 'file' ? state.imageFile : state.imageURL,
            });
            notificationStore.addNotification('New product was successfully added', 'success');
        } catch (error) {
            notificationStore.addNotification('Failed product add', 'danger');
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

    const isButtonDisabled = () => {
        return !state.name || !state.price || !state.description || !state.quantity;
    };

    const imageSelector = () => {
        return state.imageType === 'file' ? (
            <>
                <Radiobutton inputList={radioInputs} selectedValue={state.imageType} name="imageType" onChange={onChangeHandler} labelText="Image source" />
                <FileInput name="imageFile" onChange={onChangeHandler} labelText="Image file" />
                <ImagePreview file={state.imageFile} />
            </>
        ) : (
            <>
                <Radiobutton inputList={radioInputs} selectedValue={state.imageType} name="imageType" onChange={onChangeHandler} labelText="Image source" />
                <Input value={state.imageURL} name="imageURL" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Image URL" />
            </>
        );
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#ProductItemModal">
                + Add product
            </button>
            <div className="modal fade" onClick={backdropClickHandler} id="ProductItemModal" tabIndex="-1" role="dialog" aria-labelledby="productTypeLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" ref={modalBody}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="productTypeLabel">
                                Add a new product item
                            </h5>
                        </div>
                        <div className="modal-body text-left">
                            <Input value={state.name} name="name" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Name" />
                            <Input value={state.price} type="number" name="price" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Price" />
                            <Input value={state.salePrice} type="number" name="salePrice" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Sale price" />
                            <Input value={state.quantity} type="number" name="quantity" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Quantity" />
                            <Input value={state.manufacture} name="manufacture" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Manufacture" />
                            <Textarea value={state.description} name="description" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Description" />
                            <Textarea value={state.details} name="details" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Details" />
                            {imageSelector()}
                        </div>
                        <div className="modal-footer justify-content-center">
                            {isFetching && <Spinner size="40px" />}
                            <button type="button" ref={closeButton} onClick={() => resetState()} className="btn btn-secondary ml-auto" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" onClick={saveClickHandler} className="btn btn-primary" disabled={isButtonDisabled()}>
                                {isFetching ? 'Saving' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
