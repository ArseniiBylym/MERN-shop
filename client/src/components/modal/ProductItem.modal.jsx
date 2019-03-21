import React, {Fragment, useState, useRef} from 'react';
import {Input, FileInput, Radiobutton, Textarea} from '../form';
import {ImagePreview} from '../views';
import {ProductAction} from '../../actions/index';
import {toBase64} from '../../utils/helpers';

const defaultState = {
    name: '',
    price: '',
    salePrice: '',
    description: '',
    manufacture: '',
    quantity: 1,
    imageFile: '',
    imageURL: '',
    imageType: 'file',
};

export const ProductItem = ({category, subCategory}) => {
    const [state, setState] = useState({...defaultState});

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

    const saveClickHandler = () => {
        const {name, description, price, salePrice, quantity, manufacture} = state;
        ProductAction.addProduct(category, subCategory, {
            name,
            description,
            price,
            salePrice,
            quantity,
            manufacture,
            category,
            subCategory,
            imageUrl: state.imageType === 'file' ? state.imageFile : state.imageURL,
        });
        closeButton.current.click();
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

    return (
        <Fragment>
            <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#ProductItemModal">
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
                            <Radiobutton inputList={radioInputs} selectedValue={state.imageType} name="imageType" onChange={onChangeHandler} labelText="Image source" />
                            {state.imageType === 'file' ? (
                                <Fragment>
                                    <FileInput name="imageFile" onChange={onChangeHandler} labelText="Image file" />
                                    <ImagePreview file={state.imageFile} />
                                </Fragment>
                            ) : (
                                <Input value={state.imageURL} name="imageURL" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Image URL" />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeButton} onClick={() => resetState()} className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" onClick={saveClickHandler} className="btn btn-primary" disabled={isButtonDisabled()}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
