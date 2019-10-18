import React from 'react';
import './app.scss';
import { ProgramButton } from './ProgramButton.jsx';

// const _ = cockpit.gettext;

export class ProgramList extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                {this.props.programs.map((component) => (
                    <ProgramButton key={component.program} program={component.program} displayName={component.displayName} isExecuting={component.isExecuting} onClick={this.props.onClick} />
                ))}
            </div>
        );
    }
}
