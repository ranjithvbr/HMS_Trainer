import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import './Fieldpass.css'


export default class Fieldpass extends Component {
    render() {
        return (
        <div className="Textfield-pass-container">
        <TextField
        label="Password"
        type="password"
         />
        </div>
        )
    }
}
