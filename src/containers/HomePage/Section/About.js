import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {

    render() {

        return (
            <div className='section-container section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="100%"
                            src="https://www.youtube.com/embed/BBgcEY97TsM"
                            title="CODE BẰNG &quot;TAY TRÁI&quot; - CHUYỂN NGHỀ LÀM CODER LIỆU CÓ NÊN  ??? Ngành CNTT Liệu Có Phân Biệt Tuổi Tác"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam.
                            Bệnh viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành
                            ngoại khoa Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước.
                            Việt Đức là địa chỉ uy tín hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh
                            và thực hiện các kỹ thuật chụp chiếu, xét nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân. </p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
