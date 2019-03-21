import React, {Fragment} from 'react';
import PT from 'prop-types';

FileInput.propTypes = {
    name: PT.string.isRequired,
    multiple: PT.bool,
    onChange: PT.func.isRequired,
    labelText: PT.string,
    selectText: PT.string,
    readOnly: PT.bool,
};

FileInput.defaultProps = {
    name: '',
    multiple: false,
    onChange: () => {},
    labelText: '',
    selectText: 'Choose file',
    readOnly: false,
};

export function FileInput(props) {
    const {name, multiple, onChange, labelText, selectText, readOnly} = props;

    return (
        <Fragment>
            <div className="form-group">
                <label className="d-block mb-2">{labelText}</label>
                <div className="form-group">
                    <label className="btn btn-info cursor-pointer">
                        {selectText}
                        <input name={name} onChange={onChange} multiple={multiple} type="file" className="form-control-file" disabled={readOnly} hidden />
                    </label>
                </div>
            </div>
        </Fragment>
    );
}
