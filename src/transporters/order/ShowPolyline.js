import React, { Component } from "react";
import { Map, Polyline, GoogleApiWrapper, Marker } from 'google-maps-react';

const apiKey = "AIzaSyBnFedHyyQAA6CvyELBvra9XzQy0p3KkFA";
class ShowPolyline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: { lat: 10.7769, lng: 106.7009 },
            zoom: 11,
            coordinates: [],
            distance: null,
        };
    }
    calculateDistance = (fromLocation, toLocation) => {
        try {
            if (this.props.order) {
                const { google } = this.props;

                if (google) {
                    const point1 = new google.maps.LatLng(fromLocation.lat, fromLocation.lng);
                    const point2 = new google.maps.LatLng(toLocation.lat, toLocation.lng);
                    console.log(point1, point2);
                    const distance = google.maps.geometry.spherical.computeDistanceBetween(
                        point1,
                        point2
                    );

                    // Convert distance to kilometers
                    const distanceInKm = distance / 1000;
                    const result = distanceInKm.toFixed(1);
                    return parseFloat(result);
                }
                else return null;
            }
            else return null;
        }
        catch (e) {
            console.log(e);
        }
    };
    componentDidMount() {
        if (this.props.order) {
            const fromLocation = {
                lat: parseFloat(this.props.order.senderLocation.lat),
                lng: parseFloat(this.props.order.senderLocation.lng)
            }
            const toLocation = {
                lat: parseFloat(this.props.order.recieverLatLocation),
                lng: parseFloat(this.props.order.recieverLngLocation)
            }
            const distance = this.calculateDistance(fromLocation, toLocation);

            this.setState({
                coordinates: [
                    fromLocation, toLocation
                ],
                center: fromLocation,
                distance
            })
            const { lat, lng } = fromLocation;
            this.map.map.setCenter({ lat, lng });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.order !== prevProps.order) {
            const fromLocation = {
                lat: parseFloat(this.props.order.senderLocation.lat),
                lng: parseFloat(this.props.order.senderLocation.lng)
            }
            const toLocation = {
                lat: parseFloat(this.props.order.recieverLatLocation),
                lng: parseFloat(this.props.order.recieverLngLocation)
            }
            const distance = this.calculateDistance(fromLocation, toLocation);

            this.setState({
                coordinates: [
                    fromLocation, toLocation
                ],
                center: fromLocation,
                distance
            })
            const { lat, lng } = fromLocation;
            this.map.map.setCenter({ lat, lng });
        }
    }
    render() {
        const { coordinates, distance } = this.state;
        console.log(distance);

        return (
            <React.Fragment>
                <div style={{ height: '100vh', width: '100%' }} >
                    {distance && <p style={{ fontWeight: 'bold' }}>Khoảng cách: {distance} km</p>}
                    <Map
                        style={{ height: '100vh', width: '95%' }}
                        google={this.props.google}
                        initialCenter={this.state.center}
                        zoom={this.state.zoom}
                        ref={(map) => (this.map = map)}
                    >
                        <Polyline
                            path={coordinates}
                            strokeColor="#139650"
                            strokeOpacity={0.8}
                            strokeWeight={4}
                        />
                        <Marker
                            position={coordinates[0]}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                            }}
                        />
                        <Marker
                            position={coordinates[1]}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                            }}
                        />
                    </Map>
                </div>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({ apiKey })(ShowPolyline);
