import React from 'react';

export const Category = props => {
    return (
        <div className="Category">
            <h1>Category name is: {props.match.params.categoryName}</h1>
        </div>
    );
};
