import React from 'react';
import Chance from 'chance';

import sinon from 'sinon';
import {expect} from 'code';
import {shallow} from 'enzyme';
import {List, Map} from 'immutable'

import * as components from '../src/components';

describe('components', () => {
    describe('<Todo /> Component', () => {
        let chance,
            renderedContainer,
            sandbox,
            testProps;

        beforeEach(() => {
            chance = new Chance()
            sandbox = sinon.sandbox.create()
            testProps = Object.assign({
                todo: {
                    text: chance.string(),
                    id: chance.integer({min: 1, max: 10}),
                    isStriked: false
                },
                updateText: sandbox.stub()
            })            

            renderedContainer = shallow(<components.Todo {...testProps}/>).node;
        });

        it('should contain a div', () => {
            expect(renderedContainer.type).equals('div');
        });

        describe('when children are rendered', () => {
            let childElement;

            beforeEach(() => {
                childElement = renderedContainer.props.children;
            });

            it('should contain <strong/> tag to show the text', () => {
                expect(childElement[0].type).equals('strong');
                expect(childElement[0].props.children).equals(testProps.todo.text);
            });

            it('should contain <small/> tag to show the striked', () => {
                expect(childElement[1].type).equals('small');
                expect(childElement[1].props.children).equals(' not-completed');
            });

            it('should contain <span/> tag to update the text', () => {
                expect(childElement[2].type).equals('span');
                expect(childElement[2].props.children).equals(' edit');
            });

            describe('and todo is editable', () => {
                beforeEach(() => {
                    renderedContainer = shallow(<components.Todo {...testProps}/>)
                    renderedContainer.setState({isEditable: true})

                    childElement = renderedContainer.props().children
                })

                it('should contain <input/> tag to update the text', () => {
                    expect(childElement[3].type).equals('input')
                })

                it('should update the text', () => {
                    const event = {target: {value: chance.string()}, which: 13}

                    childElement[3].props.onKeyDown(event)

                    sinon.assert.called(testProps.updateText)
                    sinon.assert.calledWith(testProps.updateText, testProps.todo.id, event.target.value)
                })
            });
        });
    });

    describe('<TodoList /> Component', () => {
        let chance,
            renderedContainer,
            sandbox,
            testProps;

        beforeEach(() => {
            chance = new Chance()
            sandbox = sinon.sandbox.create()
            testProps = Object.assign({
                todos: List([Map({
                    text: chance.string(),
                    id: chance.integer({min: 1, max: 10}),
                    isStriked: false
                })]),
                strikeTodo: sandbox.stub(),
                removeTodo: sandbox.stub(),
                updateTodo: sandbox.stub(),
                addTodo: sandbox.stub()
            })            

            renderedContainer = shallow(<components.TodoList {...testProps}/>).node;
        });

        it('should contain <div/>', () => {
            expect(renderedContainer.type).equals('div');
        });

        describe('when children are rendered', () => {
            let childElement;

            beforeEach(() => {
                childElement = renderedContainer.props.children;
            });

            it('should contain <input/> tag to add the text', () => {
                expect(childElement[0].type).equals('input');
            })

            it('should add text', () => {
                const event = {target: {value: chance.string()}, which: 13}
                
                childElement[0].props.onKeyDown(event)

                sinon.assert.called(testProps.addTodo);
            })

            it('should contain <ul/> tag to show list of todos', () => {
                expect(childElement[1].type).equals('ul');
            });
        });
    });
})