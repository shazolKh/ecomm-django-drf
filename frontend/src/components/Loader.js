import React, {Component} from 'react';
import {Spinner} from "react-bootstrap";


export default class Loader extends Component {
    render() {
        return (
            <Spinner
                animation={"border"}
                role={"status"}
                style={{
                    height: '100px',
                    width: '100px',
                    margin: 'auto',
                    display: 'block'
                }}
            >
                <span className={'sr-only'}>Loading....</span>
            </Spinner>
        );
    }
}