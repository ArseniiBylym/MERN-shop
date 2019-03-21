import React, {Fragment} from 'react';
import PT from 'prop-types';

Select.propTypes = {
    name: PT.string.isRequired,
    labelText: PT.string,
    selectList: PT.array,
    selectedValue: PT.string.isRequired,
    onChange: PT.func.isRequired,
    readOnly: PT.bool,
    multiple: PT.bool,
};

Select.defaultProps = {
    name: '',
    labelText: '',
    selectList: [],
    selectedValue: '',
    onChange: () => {},
    readOnly: false,
    multiple: false,
};

export function Select(props) {
    const {name, labelText, selectList, selectedValue, onChange, readOnly, multiple} = props;

    const options = () => {
        if (!selectList.length) return null;
        return selectList.map(item => {
            return (
                <option key={item.value} value={item.value}>
                    {item.name}
                </option>
            );
        });
    };

    return (
        <Fragment>
            <div className="form-group d-inline-block mb-0">
                <label className="mb-0">
                    {labelText}
                    <select className="form-control" name={name} value={selectedValue} onChange={onChange} disabled={readOnly} multiple={multiple}>
                        {options()}
                    </select>
                </label>
            </div>
        </Fragment>
    );
}
