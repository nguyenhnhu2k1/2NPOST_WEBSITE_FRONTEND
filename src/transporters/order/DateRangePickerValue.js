import React, { Component } from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

class DateRangePickerValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [
                dayjs(),
                dayjs(),
            ],
        };
    }

    handleValueChange = (newValue) => {
        this.setState({
            value: newValue
        }, () => {
            console.log(this.state.value); // Log giá trị sau khi cập nhật xong
            const [startDate, endDate] = this.state.value;
            this.props.onDateChange(dayjs(startDate).toDate(), dayjs(endDate).toDate());
        });
    };


    render() {
        const { value } = this.state;
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer className={{ display: 'flex' }} components={['DateRangePicker', 'DateRangePicker']}>
                    <DemoItem component="DateRangePicker">
                        <DateRangePicker
                            value={value}
                            onChange={this.handleValueChange}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
        );
    }
}

export default DateRangePickerValue;
