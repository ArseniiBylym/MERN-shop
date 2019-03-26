import React, {Fragment} from 'react';
import PT from 'prop-types';

Checkbox.propTypes = {
    name: PT.string.isRequired,
    labelText: PT.string,
    inputList: PT.array,
    selectedList: PT.object,
    onChange: PT.func.isRequired,
    labelPosition: PT.oneOf(['left', 'right']),
    readOnly: PT.bool,
    flow: PT.oneOf(['row', 'column']),
};

Checkbox.defaultProps = {
    name: '',
    labelText: '',
    inputList: [],
    onChange: () => {},
    labelPosition: 'left',
    readOnly: false,
    flow: 'row',
};

export function Checkbox(props) {
    const {labelText, inputList, selectedList, onChange, labelPosition, readOnly, flow} = props;

    const isChecked = checkboxName => {
        return !!selectedList[checkboxName];
    };

    const checkboxList = () => {
        if (!inputList.length) return null;
        return inputList.map(item => {
            return (
                <div key={item.name} className={`form-check ${flow === 'row' && 'form-check-inline'}`}>
                    <label className="form-check-label cursor-pointer">
                        {labelPosition === 'right' && item.label}
                        <input className="form-check-input mx-2" type="checkbox" name={item.name} onChange={onChange} checked={isChecked(item.name)} disabled={readOnly} />
                        {labelPosition === 'left' && item.label}
                    </label>
                </div>
            );
        });
    };

    return (
        <Fragment>
            <div className="form-group form-check">
                <label className="d-block mb-2">{labelText}</label>
                {checkboxList()}
            </div>
        </Fragment>
    );
}
