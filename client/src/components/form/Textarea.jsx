import React, {Fragment} from 'react';
import PT from 'prop-types';

Textarea.propTypes = {
    value: PT.string.isRequired,
    name: PT.string.isRequired,
    rows: PT.string.isRequired,
    placeholder: PT.string,
    onChange: PT.func.isRequired,
    onKeyUp: PT.func,
    labelText: PT.string,
    labelPosition: PT.oneOf(['top', 'left', 'right', 'bottom']),
    smallText: PT.string,
    smallColor: PT.string,
    readOnly: PT.bool,
    error: PT.string,
};

Textarea.defaultProps = {
    value: '',
    name: '',
    rows: '3',
    placeholder: '',
    onChange: () => {},
    onKeyUp: () => {},
    labelText: '',
    labelPosition: 'top',
    smallText: '',
    smallColor: 'muted',
    readOnly: false,
    error: '',
};

export function Textarea(props) {
    const {value, name, placeholder, onChange, onKeyUp, labelText, labelPosition, smallText, smallColor, error, rows} = props;

    return (
        <Fragment>
            <div className={`form-group ${labelPosition === 'left' || labelPosition === 'right' ? 'row' : ''}`}>
                {labelText && <label>{labelText}</label>}
                <textarea name={name} className={`form-control ${error && 'is-invalid'}`} value={value} onChange={onChange} onKeyUp={onKeyUp} placeholder={placeholder} rows={rows}/>
                {smallText && <small className={`form-text text-${smallColor}`}>{smallText}</small>}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </Fragment>
    );
}
