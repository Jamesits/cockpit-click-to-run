import React from 'react';
import './app.scss';

// const _ = cockpit.gettext;

export class ProgramButton extends React.Component {
    handleClick = (e) => {
        e.preventDefault();
        this.props.onClick(this, this.props.program);
    }

    render() {
        var spinner = <span />;
        if (this.props.isExecuting) {
            spinner = <span className="spinner spinner-xs spinner-inline" />;
        }
        return (
            <button className="btn btn-default" type="button" disabled={this.props.isExecuting} onClick={this.handleClick}>
                {this.props.displayName}
                {spinner}
            </button>
        );
    }
}
