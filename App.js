import React  from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks:[]
        };
    }
    updateTable(e) {
        e.preventDefault();
        let tasks         = this.state.tasks;
        let taskId        = this.state.tasks.length;
        let taskTitle     = ReactDOM.findDOMNode(this.refs.title).value.trim();
        let taskSchedule  = ReactDOM.findDOMNode(this.refs.schedule).value.trim();
        let taskDone      = false;
        tasks.push({id: taskId, title: taskTitle, schedule: taskSchedule, done: taskDone});
        this.setState({tasks:tasks});
    }
    componentDidMount() {
        
    }
    componentDidUpdate() {
        
    }
    changeSelection(id,e) {
        let tasks_copy = this.state.tasks.slice();
        tasks_copy[id].done = true;
        this.setState({tasks: tasks_copy});
    }
    noItems(tasks) {
        if(tasks.filter(task => task.done === false).length === 0) {
            return (<div>no items</div>)
        }
    }
    makeList(tasks) {
        return (tasks.filter(task => task.done === false).map((task, index) =>
            <tr key={index} id={"task_"+task.id}>
                <th>
                    <input type="checkbox" checked={task.done} onChange={this.changeSelection.bind(this, task.id)} />
                </th>
                <td>{task.title}</td>
                <td>{task.schedule}</td>
            </tr>
        ));
    }
    closedList(tasks) {
        return (tasks.filter(task => task.done === true).map((task, index) =>
            <tr key={index} id={"task_"+task.id}>
                <td>{task.title}</td>
                <td>{task.schedule}</td>
            </tr>
        ));
    }
    render() {
        let taskList = this.makeList(this.state.tasks);
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Done</th>
                        <th>Task</th>
                        <th>When</th>
                    </tr>
                    </thead>
                    <tbody id="taskListBody">
                    {taskList}
                    </tbody>
                </table>
                {this.noItems(this.state.tasks)}
                <hr />
                <form onSubmit={(e)=>this.updateTable(e)}>
                <dl>
                    <dt>Task:</dt>
                    <dd><input type="text" ref="title" /></dd>
                    <dt>When:</dt>
                    <dd><input type="text" ref="schedule" /></dd>
                </dl>
                <button>add task</button>
                </form>
                <h2>Closed Tasks</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Task</th>
                        <th>When</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.closedList(this.state.tasks)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App