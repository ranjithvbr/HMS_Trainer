import React, { Component } from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Customcheckbox.css'
export default class Customcheckbox extends Component {
    render() {
        return (
            <span className="checkbox-container2">
            <FormControlLabel
            control={
            <Checkbox
           />
             }
            label="Remember me"
            />
           </span>
        )
    }
}
