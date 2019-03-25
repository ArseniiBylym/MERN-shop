import React, {Fragment, useState, useEffect, useRef} from 'react';
import './style.scss';
import {Link} from 'react-router-dom';

export const SearchInput = props => {
    const {foundList, isVisible, searchAction, outsideClickHandler, placeholder} = props;
    const [input, setInput] = useState('');
    const searchRef = useRef(null);

    useEffect(() => {
        const searchOutclickHandler = e => {
            if (searchRef.current.contains(e.target)) {
                return false;
            }
            setInput('');
            outsideClickHandler();
        };
        document.addEventListener('click', searchOutclickHandler);
        return () => {
            document.removeEventListener('click', searchOutclickHandler);
        };
    }, []);

    const clickHandler = () => {
        searchAction(input);
    };

    const keyUpHandler = e => {
        if (e.keyCode === 13) {
            clickHandler();
            return false;
        }
    };

    const onChange = e => {
        setInput(e.target.value);
    };

    const linkClickHandler = () => {
        setInput('');
        outsideClickHandler();
    };

    const itemList = () => {
        if (!isVisible) return null;
        return (
            <div className="SearchInput__dropdownMenu dropdown-menu show w-100">
                {!foundList.length && <p className="w-100 text-center">No match found</p>}
                {foundList.map((item, i) => {
                    return (
                        <Link onClick={linkClickHandler} className="my-2 py-2 no-underline" key={item._id} to={`/category/${item.category}/${item.subCategory}/${item._id}`}>
                            <div className="card row mx-0 my-2 py-2 d-flex flex-row">
                                <div className="col-5">
                                    <img src={item.imageUrl} alt="Product" className="w-100 h-auto" />
                                </div>
                                <div className="col-7">{item.name}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        );
    };

    return (
        <Fragment>
            <div ref={searchRef} className="dropdown show">
                <div>
                    <div className="input-group ">
                        <input
                            value={input}
                            onChange={onChange}
                            onKeyUp={keyUpHandler}
                            type="text"
                            className="form-control"
                            placeholder={placeholder}
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <button onClick={clickHandler} className="btn btn-primary pointer" id="basic-addon2" disabled={!input}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                {itemList()}
            </div>
        </Fragment>
    );
};
