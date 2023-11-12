import React, { Component } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class SelectSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
        this.props.onValueChange(event.target.value);
    };

    render() {
        const { value } = this.state;
        let items = this.props.itemSelect;
        return (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">{this.props.labelProp}</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={value}
                    label="Value"
                    onChange={this.handleChange}
                >
                    {/* status.map((value, index) => ( */}
                    {items.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.month}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default SelectSmall;
