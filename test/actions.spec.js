import * as actions from '../src/actions'
import {expect} from 'code'
import {shallow} from 'enzyme'
import Chance from 'chance'
import sinon from 'sinon'

describe('actions', () => {
  let chance, sandbox;

  beforeEach(() => {
    chance = new Chance();
    sandbox = sinon.sandbox.create();
  })

  it('should create an action to add a todo', () => {
    const text = chance.string()
    const id = chance.integer({min: 1, max: 10})
    
    sandbox.mock(chance).expects('integer').returns({id})

    const expectedAction = {
      type: 'ADD_TODO',
      payload: {
        id,
        isStriked: false,
        text
      }
    }

    //expect(actions.addTodo(text)).equals(expectedAction)
  })

  it('should create an action to strike a todo', () => {
    const expectedID = chance.integer({min: 1, max: 10})
    const expectedAction = {
      type: 'STRIKE_TODO',
      payload: expectedID
    }

    expect(actions.strikeTodo(expectedID)).equals(expectedAction)
  })

  it('should create an action to remove a todo', () => {
    const expectedID = chance.integer({min: 1, max: 10})
    const expectedAction = {
      type: 'REMOVE_TODO',
      payload: expectedID
    }

    expect(actions.removeTodo(expectedID)).equals(expectedAction)
  })

  it('should create an action to update a todo', () => {
    const id = chance.integer({min: 1, max: 10})
    const text = chance.string()
    const expectedAction = {
      type: 'UPDATE_TODO',
      payload: {id, text}
    }

    expect(actions.updateTodo(id, text)).equals(expectedAction)
  })
})