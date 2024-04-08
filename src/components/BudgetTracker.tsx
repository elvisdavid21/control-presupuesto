import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import { CircularProgressbar, buildStyles   } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function BudgetTracker() {

  const {state, dispatch} = useBudget()

  //Calculo de los gastos
  const gastos = useMemo(() => (state.expense.reduce((total, valor) => total + valor.amount, 0)),[state.expense])
  const disponible = state.budget - gastos

  const porcentajeGastado = +((gastos * 100) / state.budget).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
          <CircularProgressbar
            value={porcentajeGastado} text={`${porcentajeGastado}% Gastado`}
            styles={buildStyles({
              pathColor: `${porcentajeGastado > 100 ? '#dc2626' : '#3b82f6'}`,
              textColor: `${porcentajeGastado > 100 ? '#dc2626' : '#3b82f6'}`,
              trailColor: '#f5f5f5',
              textSize: '10px',
            })}
          />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <button 
          className="bg-red-600 hover:bg-red-500 p-2 text-white font-bold text-xl w-full rounded-lg uppercase"
          type="button"
          onClick={() => dispatch({type: 'restart-app'})}
        >
          Resetear App
        </button>
        <AmountDisplay 
          label="Presupuesto"
          amount={state.budget}
        />
        <AmountDisplay 
          label="Disponible"
          amount={disponible}
        />
        <AmountDisplay 
          label="Gastado"
          amount={gastos}
        />
      </div>
    </div>
  )
}

export default BudgetTracker