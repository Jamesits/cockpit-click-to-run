import cockpit from 'cockpit';
import React from 'react';
import './app.scss';

const _ = cockpit.gettext;

export class ProgramButton extends React.Component {
    onClick = (e) => {
        e.preventDefault();
        this.props.clickAction(this, this.props.program);
    }

    render() {
        var spinner = <span></span>;
        if (this.props.isExecuting) {
            spinner = <span className="spinner spinner-xs spinner-inline"></span>;
        }
        return (
            <button className="btn btn-default" type="button" disabled={this.props.isExecuting} onClick={this.onClick}>
                {this.props.displayName}
                {spinner}
            </button>
        );
    }
}
