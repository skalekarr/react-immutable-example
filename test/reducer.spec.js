import reducer from '../src/reducer'
import {expect} from 'code'
import {List, Map} from 'immutable'
import Chance from 'chance'

describe('reducer', () => {
    let chance, initialState;

    beforeEach(() => {
        chance = new Chance();
        initialState = List([]);
    })

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).equals(initialState)
    })

    it('should handle ADD_TODO', () => {
        const expectedTodoList = List(Map({}));

        expect(
            reducer(initialState, {
                type: 'ADD_TODO',
                payload: Map({})
            })
        ).equals(
            initialState.push(Map({}))
        )
    })

    it('should handle REMOVE_TODO', () => {
        const id = chance.integer({min: 1, max: 10})
        const newItem = Map({'id': id})
        initialState.push(newItem)

        expect(
            reducer(initialState, {
                type: 'REMOVE_TODO',
                payload: id
            })
        ).equals(
            List([])
        )
    })

    it('should handle STRIKE_TODO', () => {
        const id = chance.integer({min: 1, max: 10})
        const newItem = Map({'id': id, isStriked: false})
        const strikedState = List([])
        const expectedState = strikedState.push(Map({'id': id, isStriked: true}))
        initialState.push(newItem)

        expect(
            reducer(initialState, {
                type: 'STRIKE_TODO',
                payload: id
            })
        ).equals(
           initialState
        )
    })

    it('should handle UPDATE_TODO', () => {
        const id = chance.integer({min: 1, max: 10})
        const newItem = Map({'id': id, text: chance.string()})
        initialState.push(newItem)

        expect(
            reducer(initialState, {
                type: 'UPDATE_TODO',
                payload: {id, text: newItem.get('text')}
            })
        ).equals(
            initialState
        )
    })
})