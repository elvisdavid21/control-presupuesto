import { categories } from '../data/categories'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import DatePicker from 'react-date-picker';/*instalado de npm*/
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {DraftExpense, Value} from '../types/index'
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../hooks/useBudget';
import { v4 as uuidv4 } from 'uuid';

export default function ExpenseForm() {

    const {state, dispatch} = useBudget()

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    //para editar un gasto
    useEffect(() => {
        if(state.editingId) {
            const updateExpense = state.expense.filter(gasto => gasto.id === state.editingId)[0]
            setExpense(updateExpense)
        }
    }, [state.editingId])

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        const {name, value} = e.target
        const isValidAmount = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isValidAmount ? +value : value
        })
    }

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(Object.values(expense).includes('')) {
            setError('todos los campos son requeridos')
            return
        }
        setError('')
        dispatch({type: 'close-modal'})
        const expenseAddId = {...expense, id: uuidv4()}
        //agregar nuevo gasto o editarlo
        if(state.editingId) {
            //editar gasto
            const updateExpense = {...expense, id: state.editingId}
            dispatch({type: 'update-expense', payload: {expense: updateExpense}})
        }else {
            //agregar un nuevo gasto
            dispatch({type: 'add-expense', payload: {expense: expenseAddId}})
        }
    }

  return (
    <form 
        className="space-y-5 "
        onSubmit={handleSubmit}
    >
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            {state.editingId ? 'Actualizar Gasto' : 'Nuevo gasto'}
        </legend>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex  flex-col gap-2 ">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            >Nuevo gasto:</label>
            <input 
                type="text" 
                id="expenseName"
                className="border-2 bg-slate-100 p-2"
                placeholder="Añade el Nombre del Gasto"
                name='expenseName'
                value={expense.expenseName}
                onChange={handleChange}
            />
        </div>
        <div className="flex  flex-col gap-2 ">
            <label 
                htmlFor="amount"
                className="text-xl"
            >Cantidad:</label>
            <input 
                type="number" 
                id="amount"
                className="border-2 bg-slate-100 p-2"
                placeholder="Añade la Cantidad a Gastar. Ej: 300"
                name='amount'
                value={expense.amount}
                onChange={handleChange}
            />
        </div>
        <div className="flex  flex-col gap-2 ">
            <label 
                htmlFor="category"
                className="text-xl"
            >Categoria:</label>
            <select 
                id="category"
                className="border-2 bg-slate-100 p-2"
                name='category'
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">--Seleccione--</option>
                {categories.map(category => (
                    <option
                        key={category.id} 
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        
        <div className="flex  flex-col gap-2 ">
            <label 
                htmlFor="amount"
                className="text-xl"
            >Fecha Gasto:</label>
            <DatePicker
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>
        <button className='bg-blue-500 hover:bg-blue-600 text-white text-xl p-2 font-bold w-full uppercase rounded-lg'>
        {state.editingId ? 'Guardar Cambios' : 'Guardar gasto'}
        </button>
    </form>
  )
}
