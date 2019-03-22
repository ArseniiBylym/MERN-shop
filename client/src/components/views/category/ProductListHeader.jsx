import React from 'react';
import {IoMdApps, IoMdMenu, IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';
import {Select} from '../../form';
import {Modal} from '../../modal';

export const ProductListHeader = props => {
    const {sortOrder, sortOptions, sortDirrection, sortDirrectionHandler, gridView, onChangeHandler, category, subCategory, isAdmin} = props;
    return (
        <div className="ProductList__header d-flex flex-row align-items-center justify-content-around p-2 ">
            <div className="sort-select">
                <span className="mr-3">Sort by: </span>
                <Select name="sortOrder" selectedValue={sortOrder} selectList={sortOptions} onChange={onChangeHandler} />
                <div className="d-inline-block ml-2 cursor-pointer position-relative">
                    <div className="transparent-screen" onClick={sortDirrectionHandler} />
                    {sortDirrection ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
            <div className="grid-select">
                View:
                <i style={{position: 'relative'}} className={`h4 p-1 cursor-pointer ${gridView === 'grid' ? 'bg-white' : ''}`}>
                    <div className="transparent-screen" value="grid" name="gridView" onClick={onChangeHandler} />
                    <IoMdApps />
                </i>
                <i style={{position: 'relative'}} className={`h4 p-1 cursor-pointer ${gridView === 'column' ? 'bg-white' : ''}`}>
                    <div className="transparent-screen" value="column" name="gridView" onClick={onChangeHandler} />
                    <IoMdMenu />
                </i>
            </div>
            {isAdmin && (
                <div className="admin-button">
                    <Modal.ProductItem category={category} subCategory={subCategory} />
                </div>
            )}
        </div>
    );
};
