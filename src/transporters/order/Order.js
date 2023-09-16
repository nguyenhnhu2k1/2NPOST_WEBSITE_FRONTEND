import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import HeaderTrans from '../header/Header';
import './Order.scss'

class Order extends Component {

    render() {

        let showNav = this.props.showNav;
        return (
            <React.Fragment>

                {/* header  */}
                <HeaderTrans />

                {/* nội dung trang */}
                <div className='order'>
                    <div className={`order-component ${showNav ? '' : 'active-show-nav'}`}>

                        hi
                    </div>
                </div>

            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        showNav: state.app.showNav,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
