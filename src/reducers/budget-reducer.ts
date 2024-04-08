import type {Category, Expense} from '../types/index'

export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: Expense}} |
    {type: 'delete-expense', payload: {id: Expense['id']}} |
    {type: 'get-expense-by-id', payload: {id: Expense['id']}} |
    {type: 'update-expense', payload: {expense: Expense}} |
    {type: 'restart-app'} |
    {type: 'filter-expense', payload: {id: Category['id']}}

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id']
    filtroId: Category['id']
}

//Guardar el localStorage
const initilBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpense = () : Expense[] => {
    const localStorageExpense = localStorage.getItem('expenses')
    return localStorageExpense ? JSON.parse(localStorageExpense) : [] 
}

export const initialState : BudgetState = {
    budget: initilBudget(),
    modal: false,
    expense: initialExpense(),
    editingId: '',
    filtroId: ''
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if(action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false
        }
    }

    if(action.type === 'add-expense') {
        const newExpensive = action.payload.expense
        return {
            ...state,
            expense: [...state.expense, newExpensive]
        }
    }

    if(action.type === 'delete-expense') {
        return {
            ...state,
            expense: state.expense.filter(gasto => gasto.id !== action.payload.id)
        }
    }

    if(action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }

    if(action.type === 'update-expense') {
        const updateExpense = state.expense.map(editGasto => editGasto.id === action.payload.expense.id ? action.payload.expense : editGasto)
        return{
            ...state,
            expense: updateExpense,
            editingId: ''
        }
    }

    if(action.type === 'restart-app') {
        return{
            ...state,
            budget: 0,
            expense: [],
            filtroId: ''
        }
    }

    if(action.type === "filter-expense") {
        return {
            ...state,
            filtroId: action.payload.id
        }
    }

    return state
}