/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import cockpit from 'cockpit';
import React from 'react';
import './app.scss';
import { ProgramList } from './ProgramList.jsx';
import { ExecutionLog } from './ExecutionLog.jsx';

const _ = cockpit.gettext;

export class Application extends React.Component {
    constructor() {
        super();
        this.state = { 
            hostname: _("Unknown"),
            program_list_raw: "",
            program_list: [],
            execution_log: [],
        };

        cockpit.file('/etc/hostname').watch(content => {
            this.setState({ hostname: content.trim() });
        });

        // get a list of programs
        cockpit.spawn(["find", "/root/testdir", "-type", "f", "-executable"])
        .stream((data) => {
            this.setState((state) => ({
                program_list_raw: state.program_list_raw + data,
            }));
        })
        .done(() => {
            this.setState((state) => ({ 
                program_list: state.program_list_raw.split('\n').filter((value) => (value.length > 0)).map((value) => (
                    {
                        program: value,
                        displayName: value.split("/").slice(-1)[0],
                        isExecuting: false,
                    }
                )),
            }));
        });
    }

    onExecutionStream = (executionObj, data) => {
        executionObj.stdout += data;
        // console.log(data);
        this.setState({});
    }

    onExecutionSucceed = (executionObj) => {
        // console.log(executionObj.programObj.program, "succeed");
        executionObj.endTime = new Date();
        executionObj.successful = true;

        this.setState((state) => ({
            program_list: state.program_list.map((obj) => {
                if (obj.program == executionObj.programObj.program) {
                    obj.isExecuting = false;
                }
                return obj;
            })
        }));
    }

    onExecutionFailure = (executionObj) => {
        // console.log(executionObj.programObj.program, "failed");
        executionObj.endTime = new Date();
        executionObj.successful = false;

        this.setState((state) => ({
            program_list: state.program_list.map((obj) => {
                if (obj.program == executionObj.programObj.program) {
                    obj.isExecuting = false;
                }
                return obj;
            })
        }));
    }

    execute = (programObj) => {
        console.log("executing", programObj.program);
        var newExecutionObj = {
            programObj: programObj,
            stdout: "",
            startTime: null,
            endTime: null,
            successful: null,
        };
        cockpit.spawn([programObj.program])
        .stream(this.onExecutionStream.bind(this, newExecutionObj))
        .done(this.onExecutionSucceed.bind(this, newExecutionObj))
        .fail(this.onExecutionFailure.bind(this, newExecutionObj));
        return newExecutionObj;
    }

    handleProgramButtonClick = (target, program) => {
        // set the button state
        this.setState((state) => {
            var newExecutionObj = null;
            state.program_list = state.program_list.map((obj) => {
                if (obj.program == program) {
                    obj.isExecuting = true;
                    newExecutionObj = this.execute(obj);
                }
                return obj;
            });
            if (newExecutionObj != null)
                state.execution_log.unshift(newExecutionObj);
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className="container-fluid">
                <h2>{ _("Cockpit 365 Click-to-Run") }</h2>
                <p>
                    { cockpit.format(_("Running on $0"), this.state.hostname) }
                </p>
                <h3>{ _("Programs:") }</h3>
                <ProgramList programs={this.state.program_list} clickAction={this.handleProgramButtonClick} />
                <h3>{ _("Logs:") }</h3>
                <ExecutionLog execution_list={this.state.execution_log} />
            </div>
        );
    }
}
