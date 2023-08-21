import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-container medical-facility-container'>
                <div className='header-container-section'>
                    <div className='title-header'>CƠ SỞ Y TẾ</div>
                    <button className='btn-header'>XEM THÊM</button>
                </div>
                <div className="container">
                    <Slider {...this.props.settings}>
                        <div className='image-component'>
                            <div className='img-section img-medical-facility'></div>
                            <div className='title-section'>Bệnh viện hữu nghị Việt Đức 1</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-medical-facility'></div>
                            <div className='title-section'>Bệnh viện hữu nghị Việt Đức 2</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-medical-facility'></div>
                            <div className='title-section'>Bệnh viện hữu nghị Việt Đức 3</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-medical-facility'></div>
                            <div className='title-section'>Bệnh viện hữu nghị Việt Đức 4</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-medical-facility'></div>
                            <div className='title-section'>Bệnh viện hữu nghị Việt Đức 5</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-medical-facility'></div>
                            <div className='title-section'>Bệnh viện hữu nghị Việt Đức 6</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-medical-facility'></div>
                            <div className='title-section'>Bệnh viện hữu nghị Việt Đức 7</div>
                        </div>
                    </Slider>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
