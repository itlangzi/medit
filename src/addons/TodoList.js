import React from 'react'
import icons from '@/icons'
import Addon from './Addon'

import { todoList, hotKeys } from '../util'
class TodoList extends Addon {
    constructor(props) {
        super(props)
    }
    onTodoList = e => {
        e.preventDefault()
        todoList(this.props.editor)
    }
    render() {
        const { i18n } = this.props
        return (
            <a href="" title={i18n('todo list') + ' ' + hotKeys.todoList} onClick={this.onTodoList}>
                <icons.TodoList />
            </a>
        )
    }
}

export default TodoList
export const name = 'todo-list'