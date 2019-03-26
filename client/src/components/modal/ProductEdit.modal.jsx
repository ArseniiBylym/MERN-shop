/* eslint-disable indent */
import React, {Fragment, useState, useRef, useEffect} from 'react';
import {FaEdit} from 'react-icons/fa';
import {Input, FileInput, Radiobutton, Textarea, Checkbox} from '../form';
import {ImagePreview} from '../views';
import {ProductAction} from '../../actions/index';
import {toBase64} from '../../utils/helpers';

const defaultImageState = {
    imageFile: '',
    imageURL: '',
    imageType: 'file',
};

export const ProductEdit = props => {
    const [state, setState] = useState(null);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

    useEffect(() => {
        setState({
            ...props,
            ...defaultImageState,
        });
    }, [props]);

    const radioInputs = [{label: 'Select file', value: 'file'}, {label: 'Select URL', value: 'url'}];
    const checkboxList = [{label: 'Update image', name: 'withImage'}];

    const modalBody = useRef(null);
    const closeButton = useRef(null);
    const resetState = () => {
        setState(props);
        setSelectedCheckboxes({});
    };

    const backdropClickHandler = e => {
        if (modalBody.current.contains(e.target)) return;
        resetState();
    };

    const isChecked = checkboxName => {
        return !!selectedCheckboxes[checkboxName];
    };
    const saveClickHandler = () => {
        const {_id, name, description, price, salePrice, quantity, manufacture, category, subCategory, details} = state;
        const image = () => {
            if (selectedCheckboxes.withImage) {
                return state.imageType === 'file' ? state.imageFile : state.imageURL;
            }
            return undefined;
        };
        ProductAction.editProduct(_id, {
            name,
            description,
            price,
            salePrice,
            quantity,
            manufacture,
            category,
            subCategory,
            details,
            imageUrl: image(),
        });
        closeButton.current.click();
    };

    const onChangeHandler = async e => {
        const target = e.target;
        const {type, name} = target;
        let value = target.value;
        switch (type) {
            case 'checkbox':
                setSelectedCheckboxes({
                    ...selectedCheckboxes,
                    [name]: !selectedCheckboxes[name],
                });
                break;
            case 'file':
                value = await toBase64(target.files[0]);
                setState({
                    ...state,
                    [name]: value,
                });
                break;
            default:
                setState({
                    ...state,
                    [name]: value,
                });
                break;
        }
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

    if (!state) return null;
    return (
        <Fragment>
            <button type="button" className="btn btn-outline-info d-flex align-items-center" data-toggle="modal" data-target="#ProductEditModal">
                <FaEdit /> <p className="mb-0 ml-1">Edit product</p>
            </button>
            <div
                className="modal fade text-primary_black"
                onClick={backdropClickHandler}
                id="ProductEditModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="productTypeLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content" ref={modalBody}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="productTypeLabel">
                                Edit current product data
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
                            <Checkbox inputList={checkboxList} selectedList={selectedCheckboxes} name="withImage" onChange={onChangeHandler} labelText="" />
                            {isChecked('withImage') && imageSelector()}
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
