import React from 'react';
import './app.scss';
import { ExecutionLogItem } from './ExecutionLogItem.jsx';

// const _ = cockpit.gettext;

export class ExecutionLog extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.execution_list.map((component, key) => (
                    <ExecutionLogItem key={key} executionObj={component} />
                ))}
            </div>
        );
    }
}
