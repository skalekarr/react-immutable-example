import Chance from 'chance';

var chance = new Chance();

export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: chance.integer({min: 1, max: 10}),
      isStriked: false,
      text
    }
  };
}

export function strikeTodo(id) {
  return {
    type: 'STRIKE_TODO',
    payload: id
  }
}

export function removeTodo(id) {
  return {
    type: 'REMOVE_TODO',
    payload: id
  }
}

export function updateTodo(id, text) {
  return {
    type: 'UPDATE_TODO',
    payload: {
        id,
        text
    }
  }
}