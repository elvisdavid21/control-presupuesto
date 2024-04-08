import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ListExpense from "./components/ListExpense"
import FilterByCategory from "./components/FilterByCategory"

function App() {

  const {state} = useBudget()

  const isValidBudget = useMemo(() => {
    return state.budget > 0
  }, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expense))
  },[state])

  return (
    <>
      <header className="bg-blue-700 py-8 max-h-72">
        <h1 className="uppercase text-white font-black text-4xl text-center">Planificador de Gastos</h1>
      </header>

      <div className="max-w-3xl shadow-lg p-10 mx-auto mt-10 rounded-lg bg-white">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory/>
          <ListExpense/>
          <ExpenseModal/>
        </main>
      )}
    </>
  )
}

export default App
