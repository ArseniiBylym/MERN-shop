import React, {Fragment} from 'react';
import PT from 'prop-types';

Input.propTypes = {
    type: PT.oneOf(['text', 'email', 'password', 'file']),
    value: PT.string.isRequired,
    name: PT.string.isRequired,
    defaultValue: PT.string,
    placeholder: PT.string,
    onChange: PT.func.isRequired,
    onKeyUp: PT.func,
    labelText: PT.string,
    labelPosition: PT.oneOf(['top', 'left', 'right', 'bottom']),
    smallText: PT.string,
    smallColor: PT.string,
    inputGroup: PT.bool,
    inputGroupPosition: PT.oneOf(['start', 'end']),
    inputGroupText: PT.string,
    inputGroupIcon: PT.element,
    readOnly: PT.bool,
    error: PT.string,
};

Input.defaultProps = {
    type: 'text',
    value: '',
    name: '',
    placeholder: '',
    onChange: () => {},
    onKeyUp: () => {},
    labelText: '',
    labelPosition: 'top',
    smallText: '',
    smallColor: 'muted',
    inputGroup: false,
    inputGroupPosition: 'start',
    inputGroupText: '',
    inputGroupIcon: null,
    readOnly: false,
    error: '',
};

export function Input(props) {
    const {type, value, name, placeholder, onChange, onKeyUp, labelText, labelPosition, smallText, smallColor, inputGroup, inputGroupPosition, inputGroupText, inputGroupIcon, readOnly, error} = props;

    return (
        <Fragment>
            <div className={`form-group ${labelPosition === 'left' || labelPosition === 'right' ? 'row' : ''}`}>
                {labelText && <label>{labelText}</label>}
                <input type={type} name={name} className={`form-control ${error && 'is-invalid'}`} value={value} onChange={onChange} onKeyUp={onKeyUp} placeholder={placeholder} />
                {smallText && <small className={`form-text text-${smallColor}`}>{smallText}</small>}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </Fragment>
    );
}
