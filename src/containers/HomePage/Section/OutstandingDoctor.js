import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class OutstandingDoctor extends Component {

    render() {

        return (
            <div className='section-container'>
                <div className='header-container-section'>
                    <div className='title-header'>BÁC SĨ NỔI BẬT</div>
                    <button className='btn-header'>XEM THÊM</button>
                </div>
                <div className="container">
                    <Slider {...this.props.settings}>
                        <div className='image-component'>
                            <div className='img-section img-outstanding-doctor'></div>
                            <div className='title-section title-outstanding-doctor'>Bác sĩ chuyên khoa II Trần Minh Khuyên 1</div>
                            <div className='title-section specialty'>Sức khỏe tâm thần</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-outstanding-doctor'></div>
                            <div className='title-section title-outstanding-doctor'>Bác sĩ chuyên khoa II Trần Minh Khuyên 2</div>
                            <div className='title-section specialty'>Sức khỏe tâm thần</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-outstanding-doctor'></div>
                            <div className='title-section title-outstanding-doctor'>Bác sĩ chuyên khoa II Trần Minh Khuyên 3</div>
                            <div className='title-section specialty'>Sức khỏe tâm thần</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-outstanding-doctor'></div>
                            <div className='title-section title-outstanding-doctor'>Bác sĩ chuyên khoa II Trần Minh Khuyên 4</div>
                            <div className='title-section specialty'>Sức khỏe tâm thần</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-outstanding-doctor'></div>
                            <div className='title-section title-outstanding-doctor'>Bác sĩ chuyên khoa II Trần Minh Khuyên 5</div>
                            <div className='title-section specialty'>Sức khỏe tâm thần</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-outstanding-doctor'></div>
                            <div className='title-section title-outstanding-doctor'>Bác sĩ chuyên khoa II Trần Minh Khuyên 6</div>
                            <div className='title-section specialty title-outstanding-doctor'>Sức khỏe tâm thần</div>
                        </div>
                        <div className='image-component'>
                            <div className='img-section img-outstanding-doctor'></div>
                            <div className='title-section title-outstanding-doctor'>Bác sĩ chuyên khoa II Trần Minh Khuyên 7</div>
                            <div className='title-section specialty'>Sức khỏe tâm thần</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
