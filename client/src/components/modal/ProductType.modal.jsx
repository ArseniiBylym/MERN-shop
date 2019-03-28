import React, {Fragment, useState, useRef, useContext} from 'react';
import {Input} from '../form';
import {NotificationStore} from '../../stores';
import {ProductAction} from '../../actions/index';

export const ProductType = () => {
    const [categoryName, setCategoryName] = useState('');
    const notificationStore = useContext(NotificationStore);

    const modalBody = useRef(null);
    const closeButton = useRef(null);

    const backdropClickHandler = e => {
        if (modalBody.current.contains(e.target)) return;
        setCategoryName('');
    };

    const saveClickHandler = async () => {
        if (!categoryName) return false;
        await ProductAction.addCategory(categoryName);
        notificationStore.addNotification('New group successfully added', 'success');
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
            <button type="button" className="btn btn-outline-danger d-flex align-items-center p-2" data-toggle="modal" data-target="#ProductTypeModal">
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
