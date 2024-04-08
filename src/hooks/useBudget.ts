import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!context) {
        throw new Error('useBudget no deberia ser usado sin un BudgetProvider ')
    }
    return context
}