import React, { Component } from 'react';
import { connect } from 'react-redux';
import './userManage.scss'
import { addNewUserService, getAllUsers, deleteUserService } from '../../services/userService.js'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter.js'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserInPage();
    }

    getAllUserInPage = async () => {
        let users = await getAllUsers('All');
        if (users && users.errCode === 0) {
            this.setState({
                arrUsers: users.User
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    handleCreateUser = async (data) => {
        try {
            let response = await addNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            }
            else {
                this.setState({
                    isOpenModalUser: false,
                })
                await this.getAllUserInPage();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (item) => {
        try {
            let res = await deleteUserService(item.id);
            if (res && res.errCode === 0) {
                await this.getAllUserInPage();
            }
        } catch (e) {

        }
    }

    handleEditUser = async (item) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: item
        })
    }

    handleNewUserForEdit = async (item) => {
        console.log(item);
    }


    render() {
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleModal={this.toggleUserModal}
                    handleCreateUser={this.handleCreateUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleModal={this.toggleEditUserModal}
                        userCurrent={this.state.userEdit}
                        handleNewUserForEdit={this.handleNewUserForEdit}
                    />
                }
                <div className='title text-center'>
                    Manage users with HN
                </div>
                <div>
                    <button className='btn btn-primary px-3 mx-4' onClick={() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='users-table mt-4 mx-4'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Fullname</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Sex</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                            {this.state.arrUsers && this.state.arrUsers.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.roleId}</td>
                                        <td>
                                            <div className='action-div'>
                                                <button className='action-edit' onClick={() => this.handleEditUser(item)}>
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className='action-delete' onClick={() => this.handleDeleteUser(item)}>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
