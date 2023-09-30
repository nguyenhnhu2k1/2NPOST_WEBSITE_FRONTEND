import React, { Component } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class SelectSmall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
        };
    }

    handleChange = (event) => {
        this.setState({ age: event.target.value });
    };

    render() {
        const { age } = this.state;
        let items = this.props.itemSelect;
        return (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">{this.props.labelProp}</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={this.handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {/* status.map((value, index) => ( */}
                    {items.map((item, index) => (
                        <MenuItem value={item.value}>{item.month}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default SelectSmall;
