import React, {Fragment, useState, useRef} from 'react';
import {Input} from '../form';
import {ProductAction} from '../../actions/index';

export const ProductType = () => {
    const [categoryName, setCategoryName] = useState('');

    const modalBody = useRef(null);
    const closeButton = useRef(null);

    const backdropClickHandler = e => {
        if (modalBody.current.contains(e.target)) return;
        setCategoryName('');
    };

    const saveClickHandler = () => {
        if (!categoryName) return false;
        ProductAction.addCategory(categoryName);
        closeButton.current.click();
    };

    const onChangeHandler = e => {
        setCategoryName(e.target.value);
    };

    const onKeyUpHandler = e => {
        if (e.keyCode === 13) {
            saveClickHandler();
            return false;
        }
    };

    return (
        <Fragment>
            <button type="button" className="btn btn-outline-info d-flex align-items-center p-2" data-toggle="modal" data-target="#ProductTypeModal">
                + Add group
            </button>
            <div className="modal fade" onClick={backdropClickHandler} id="ProductTypeModal" tabIndex="-1" role="dialog" aria-labelledby="productTypeLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" ref={modalBody}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="productTypeLabel">
                                Add new product category
                            </h5>
                        </div>
                        <div className="modal-body">
                            <Input value={categoryName} onChange={onChangeHandler} onKeyUp={onKeyUpHandler} labelText="Category name" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeButton} onClick={() => setCategoryName('')} className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                            <button type="button" onClick={saveClickHandler} className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};
