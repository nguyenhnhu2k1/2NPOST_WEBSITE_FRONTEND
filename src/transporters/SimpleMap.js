import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { KeyCodeUtils } from '../utils';

const apiKey = "AIzaSyBnFedHyyQAA6CvyELBvra9XzQy0p3KkFA";
const apiOpenCageGeocoding = "f909471eb90149abb6db6ee3af493d4d";
class SimpleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 10.7769,
                lng: 106.7009
            },
            selectedLocation: null,
            zoom: 11,
            address: '',
            showAddress: ''

        };
    }

    handleMapClick = (mapProps, map, clickEvent) => {
        const lat = clickEvent.latLng.lat();
        const lng = clickEvent.latLng.lng();
        this.setState({ selectedLocation: { lat, lng } });
        this.setState({ lat, lng }, () => {
            this.getAddressFromLatLong(lat, lng);
        });
    }

    getAddressFromLatLong = (lat, lng) => {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiOpenCageGeocoding}`;

        axios.get(url)
            .then((response) => {
                const results = response.data.results;
                if (results && results.length > 0) {
                    const formattedAddress = results[0].formatted;
                    this.setState({
                        showAddress: formattedAddress
                    });
                    console.log(this.state.selectedLocation)
                    this.addressTransmissionToAddress();
                } else {
                    this.setState({ address: 'Không tìm thấy địa chỉ.' });
                }
            })
            .catch((error) => {
                console.error('Lỗi khi lấy địa chỉ:', error);
                this.setState({ address: 'Đã xảy ra lỗi.' });
            });
    };

    changeAdress = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    getlnglatFromAdress = (event) => {
        if (event.keyCode === KeyCodeUtils.ENTER) {
            axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                    this.state.address
                )}&key=${apiOpenCageGeocoding}`)
                .then((response) => {
                    const results = response.data.results;

                    if (results.length > 0) {
                        const location = results[0].geometry;
                        const lng = location.lng;
                        const lat = location.lat;
                        this.setState({
                            selectedLocation: { lat, lng },
                            showAddress: this.state.address,
                        }, () => {
                            // Lấy tham chiếu đến bản đồ
                            const map = this.map;

                            // Đặt lại tâm bản đồ và mức độ phóng to
                            if (map) {
                                map.map.setCenter({ lat, lng });
                                map.map.setZoom(15); // Thay đổi mức độ phóng to theo nhu cầu của bạn
                            }
                        });
                        console.log(this.state.selectedLocation)
                        this.addressTransmissionToAddress();

                    } else {
                        console.log("Không tìm thấy địa chỉ.");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy địa chỉ:", error);
                });
        }
    }

    addressTransmissionToAddress = () => {
        this.props.getAddres(this.state.showAddress, this.state.selectedLocation);
    }

    render() {
        return (
            <React.Fragment>
                <p>Vị trí: {this.state.showAddress}</p>
                <input
                    className="col-12"
                    onKeyDown={this.getlnglatFromAdress}
                    value={this.state.address}
                    onChange={this.changeAdress}
                    style={{ marginBottom: '10px' }}
                />
                <div style={{ height: '100vh', width: '100%' }} >

                    <Map
                        style={{ height: '100vh', width: '95%' }}
                        google={this.props.google}
                        initialCenter={this.state.selectedLocation || this.state.center}
                        zoom={this.state.zoom}
                        onClick={this.handleMapClick}
                        ref={(map) => (this.map = map)}
                    >
                        {this.state.selectedLocation &&
                            <Marker
                                position={this.state.selectedLocation}
                                icon={{
                                    url: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png', // Thay thế bằng đường dẫn đến biểu tượng của bạn
                                    scaledSize: new window.google.maps.Size(30, 30)
                                }}
                            />
                        }
                    </Map>
                </div>
            </React.Fragment>

        );
    }
}

export default GoogleApiWrapper({ apiKey })(SimpleMap);
