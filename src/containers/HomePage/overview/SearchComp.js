import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SearchComp.scss';

import deliveryCartoon from "../../../assets/images/homepage/overview_home/delivery-cartoon.png"

class SearchComp extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='search-comp-container animation-rise-base row'>
                    <div className='search-comp-parrent col-md-7'>
                        <div className='search-comp-child'>
                            <p className='title-1-base'>Tra cứu mã đơn hàng</p>
                            <p className='text-base'>(Xem thông tin đơn hàng hiện tại của bạn bằng cách nhập vào ID đơn hàng)</p>
                            <div className='col-12 form-group '>
                                <input type='text' className='form-control' placeholder='Enter your order ID'></input>
                            </div>
                            <button type="button" className="btn btn-danger btn-search">
                                <span className='title-4-base'>Tra cứu</span>
                                <i className="fas fa-long-arrow-alt-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <img className='image' src={deliveryCartoon} alt={deliveryCartoon} />
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComp);
