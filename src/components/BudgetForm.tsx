import { useMemo, useState, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

function BudgetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setBudget(+e.target.value)
    }

    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0
    }, [budget])

    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({type: 'add-budget', payload: {budget}})
    }

  return (
    <form 
        className="space-y-5"
        onSubmit={handleSubmit}
    >
        <div className="flex flex-col space-y-5">
            <label className="text-4xl text-blue-600 font-bold text-center" htmlFor="gasto">Definir Presupuesto</label>
            <input 
                id="gasto" type="number"
                className="w-full bg-white border border-gray-200 p-2" 
                placeholder="Define tu presupuestto"
                name="gasto"
                value={budget}
                onChange={handleChange}
                
            />
        </div>
        <input type="submit" value='Guardar Gasto' 
            className="bg-blue-600 hover:bg-blue-700 p-2 w-full text-lg uppercase font-bold text-white disabled:opacity-40"
            disabled={isValid}
        />
    </form>
  )
}

export default BudgetForm