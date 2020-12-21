import React, { Component } from 'react';
import '../styles/SelectMenu.css'


class SelectMenu extends Component {
    render() {
        const {name, label, onChange, value, endLabel} = this.props;
        const options = this.props.options.map((r, index) => (
            <option key={r.value} {...r}>{r.name}</option>
        ));
        return (
            <div className='SelectContainer'>
                <label className='SelectLabel'>
                    {label}
                </label>
                <select 
                    className='SelectOptions'
                    name={name}
                    onChange={onChange}
                    value={value}
                >
                {options}
                </select>
                <label className='SelectLabel'>
                    {endLabel}
                </label>
            </div>
        )
    }
}
export default SelectMenu