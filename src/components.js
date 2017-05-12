import React, {Component} from 'react';

export class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditable: false
    }

    this.update = this.update.bind(this);
    this.updateClick = this.updateClick.bind(this);
  }

  updateClick() {
    this.setState((state, props) => ({isEditable: true}));
  }

  update(event) {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which === 13);
    const isLongEnough = text.length > 0;

    if(isEnterKey && isLongEnough) {
      this.setState((state, props) => ({isEditable: false}));
      this.props.updateText(this.props.todo.id, text)
    }
  }

  render() {
    return <div>
            <strong>{this.props.todo.text}</strong>
            <small>{this.props.todo.isStriked ? ' completed' : ' not-completed'}</small>
            <span onClick={()=>this.updateClick()}>{' edit'}</span>
            {this.state.isEditable && <input type='text' onKeyDown={this.update}/>}
         </div>;
  }
}

export class TodoList extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which === 13);
    const isLongEnough = text.length > 0;

    if(isEnterKey && isLongEnough) {
      this.props.addTodo(text);
      input.value = '';
    }
  };

  render() {
    return (
      <div>
        <input type='text'
              placeholder='Add Something here'
              onKeyDown={this.onSubmit} />
        <ul>
          {this.props.todos.map(t => (
            <li key={t.get('id')}>
              <span onClick={()=>this.props.strikeTodo(t.get('id'))}>{' mark'}</span>
              <span onClick={()=>this.props.removeTodo(t.get('id'))}>{' remove'}</span>
              <Todo todo={t.toJS()} updateText={this.props.updateTodo}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}