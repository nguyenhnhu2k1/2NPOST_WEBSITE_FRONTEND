import React, { Component } from 'react';
import { connect } from 'react-redux';


import './AcceptBtn.scss';

class AcceptBtn extends Component {


    render() {

        return (
            <React.Fragment>
                <div className='btn-component'>
                    <button className='accept-component'>
                        {this.props.nameAccept}
                    </button>
                    <button className='cancle-component'>
                        {this.props.nameCancle}
                    </button>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AcceptBtn);
