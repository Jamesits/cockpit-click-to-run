import cockpit from 'cockpit';
import React from 'react';
import './app.scss';

const _ = cockpit.gettext;

export class ExecutionLogItem extends React.Component {
    render() {
        var status = "";
        switch(this.props.executionObj.successful) {
            case null:
                status = "R";
                break;
            case true:
                status = "✓";
                break;
            case false:
                status = "✗"
                break;
          }
        return (
            <div>
                <h3>[{status}]{this.props.executionObj.programObj.displayName}</h3>
                <h4>{ _("Standard output:") }</h4>
                <div><pre>{ this.props.executionObj.stdout }</pre></div>
            </div>
        );
    }
}
