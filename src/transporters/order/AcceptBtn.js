import React, { Component } from 'react';
import { connect } from 'react-redux';


import './AcceptBtn.scss';

class AcceptBtn extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            stepNext: ''

        })
    }
    handleAccept = (step) => {
        console.log(step)
    }
    handleCancel = (step) => {
        console.log(step)
    }
    updateStepNext = () => {
        let stepNext = ''
        if (this.props.nameAccept === 'OS0') {
            stepNext = 'TS0';
        }
        if (this.props.nameAccept === 'TS0') {
            stepNext = 'TS1';
        }
        if (this.props.nameAccept === 'TS1') {
            stepNext = 'TS2';
        }
        if (this.props.nameAccept === 'TS2') {
            stepNext = 'TS3';
        }
        if (this.props.nameAccept === 'TS3') {
            stepNext = 'TS4';
        }
        console.log('stepNext', stepNext);
        this.setState({
            stepNext
        })
    }
    componentDidMount() {
        this.updateStepNext();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.stepNext !== prevState.stepNext) {
            this.updateStepNext();
        }
    }

    render() {
        console.log(this.state.stepNext)

        return (
            <React.Fragment>
                <div className='btn-component'>
                    <button className='accept-component' disabled={this.props.nameAccept === 'Xem chi tiết'}
                        onClick={() => this.handleAccept(this.state.stepNext)}
                    >
                        {this.props.nameAccept}
                    </button>
                    <button className='cancle-component' hidden={this.props.nameAccept === 'Xem chi tiết'}
                        onClick={() => this.handleCancel('OS2')}
                    >
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
