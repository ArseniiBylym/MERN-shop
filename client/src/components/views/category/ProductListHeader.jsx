import React from 'react';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';
import {Select} from '../../form';
import {Modal} from '../../modal';

export const ProductListHeader = props => {
    const {sortOrder, sortOptions, sortDirrection, sortDirrectionHandler, onChangeHandler, category, subCategory, isAdmin} = props;
    return (
        <div className="ProductList__header d-flex flex-row align-items-center justify-content-start p-2 ">
            <div className="sort-select">
                <span className="mr-3">Sort by: </span>
                <Select name="sortOrder" selectedValue={sortOrder} selectList={sortOptions} onChange={onChangeHandler} />
                <div className="d-inline-block ml-2 cursor-pointer position-relative">
                    <div className="transparent-screen" onClick={sortDirrectionHandler} />
                    {sortDirrection ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
            {isAdmin && (
                <div className="admin-button ml-auto">
                    <Modal.ProductItem category={category} subCategory={subCategory} />
                </div>
            )}
        </div>
    );
};
