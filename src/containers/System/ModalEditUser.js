import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            email: '',
            password: '',
            fullName: '',
            address: '',
            phone: '',
            gender: '',
            roleId: '',
        }
    }

    componentDidMount() {
        this.getDataFromUserTable(this.props.userCurrent)
    }

    toggle = () => {
        this.props.toggleModal();
    }

    handleChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState })

    }

    checkValideInput = () => {
        let arrInput = ["email", "password", "fullName",
            "address", "phone"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                alert("Missing parameter: " + arrInput[i]);
                return false;
            }
        }
        return true;
    }

    handleSaveNewUser = () => {
        let checkValide = this.checkValideInput();
        if (checkValide) {
            this.props.handleNewUserForEdit(this.state);
        }
    }

    getDataFromUserTable = (user) => {
        console.log(user)
        if (user && !_.isEmpty(user)) {
            this.setState({
                email: user.email,
                password: '1010',
                fullName: user.fullname,
                address: user.address,
                phone: user.phonenumber,
                gender: user.gender,
                roleId: user.roleId,
            })
        }
    }

    render() {
        return (
            <div>

                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'abcClassName'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <form className="row g-3 mt-3 col-md-6" action="action-crud" method="post">
                                    <div className="col-12">Edit a user</div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="inputEmail4"
                                            name="email"
                                            value={this.state.email}
                                            disabled
                                            onChange={(event, id) => { this.handleChangeInput(event, "email") }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="inputPassword4"
                                            name="password"
                                            value={this.state.password}
                                            disabled
                                            onChange={(event, id) => { this.handleChangeInput(event, "password") }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputFullname4" className="form-label">Fullname</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputFullname4"
                                            name="fullName"
                                            value={this.state.fullName}
                                            onChange={(event, id) => { this.handleChangeInput(event, "fullName") }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="inputAddress" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputAddress"
                                            placeholder="1234 Main St"
                                            name="address"
                                            value={this.state.address}
                                            onChange={(event, id) => { this.handleChangeInput(event, "address") }} />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputPhone" className="form-label">Phone number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="inputPhone"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={(event, id) => { this.handleChangeInput(event, "phone") }} />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputGender" className="form-label">Sex</label>
                                        <select id="inputGender" className="form-select" name="gender">
                                            <option value="0">Male</option>
                                            <option value="1">Female</option>
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputRole" className="form-label">Role</label>
                                        <select id="inputRole" className="form-select" name="roleId">
                                            <option value="0">Admin</option>
                                            <option value="1">Doctor</option>
                                            <option value="2">Patient</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSaveNewUser()}>
                            Save changes
                        </Button>
                        <Button color="secondary" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
