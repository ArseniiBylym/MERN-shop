import React, {Fragment} from 'react';
import PT from 'prop-types';

Radiobutton.propTypes = {
    name: PT.string.isRequired,
    labelText: PT.string,
    inputList: PT.array,
    selectedValue: PT.string.isRequired,
    onChange: PT.func.isRequired,
    labelPosition: PT.oneOf(['left', 'right']),
    readOnly: PT.bool,
    flow: PT.oneOf(['row', 'column']),
};

Radiobutton.defaultProps = {
    name: '',
    labelText: '',
    inputList: [],
    selectedValue: '',
    onChange: () => {},
    labelPosition: 'left',
    readOnly: false,
    flow: 'row',
};

export function Radiobutton(props) {
    const {name, labelText, inputList, selectedValue, onChange, labelPosition, readOnly, flow} = props;

    const radiobuttonList = () => {
        if (!inputList.length) return null;
        return inputList.map(item => {
            return (
                <div key={item.value} className={`form-check ${flow === 'row' && 'form-check-inline'}`}>
                    <label className="form-check-label cursor-pointer">
                        {labelPosition === 'right' && item.label}
                        <input className="form-check-input mx-2" type="radio" name={name} value={item.value} onChange={onChange} checked={item.value === selectedValue} disabled={readOnly} />
                        {labelPosition === 'left' && item.label}
                    </label>
                </div>
            );
        });
    };

    return (
        <Fragment>
            <div className="form-group">
                <label className="d-block mb-2">{labelText}</label>
                {radiobuttonList()}
            </div>
        </Fragment>
    );
}
