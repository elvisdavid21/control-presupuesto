import { useBudget } from "../hooks/useBudget"
import {formatDate} from '../helpers/index'
import { useMemo } from "react"
import AmountDisplay from "./AmountDisplay"
import InfoCategoria from "./InfoCategoria"
//Para los efectos de las acciones de editar y eliminar
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';

function ListExpense() {

    const {state, dispatch} = useBudget()
    
    const filtroGastos = state.expense.filter(gasto => gasto.category === state.filtroId)
    const listaGastos = +state.filtroId ? filtroGastos : state.expense
    const isValidExpense = useMemo(() => listaGastos.length === 0,[state.filtroId, state.expense])

    //Funciones para la animacion
    const leadingActions = (id : string) => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'get-expense-by-id', payload: {id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = (id : string) => (
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'delete-expense', payload: {id}})}
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <>
        {isValidExpense ? <p className="text-xl text-center font-bold">No hay gastos</p>
            :
        <div className="flex flex-col gap-5">
            <p className="text-3xl text-center font-black border-b-4 p-2 mb-2 uppercase">Listado de gastos</p>
            {listaGastos.map(gasto => (
            <div
                key={gasto.id}
                className="bg-white shadow-lg rounded-lg">
                <SwipeableList>
                    <SwipeableListItem
                        maxSwipe={1} //pixeles que recorre en la animacion
                        leadingActions={leadingActions(gasto.id)} //lado izquierdo cuando arrastras
                        trailingActions={trailingActions(gasto.id)} //lado derecho cuando arrastras
                    >
                        <div className="w-full flex justify-between text-3xl font-bold px-10 py-6">
                            <div className="flex justify-center items-center gap-6">
                                <InfoCategoria
                                    info={gasto.category}
                                />
                                <div>
                                    <p className="text-black uppercase">{gasto.expenseName}</p>
                                    <p className="text-xl text-neutral-500">{formatDate(gasto.date!.toString())}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <AmountDisplay
                                    amount={gasto.amount}
                                />
                            </div>
                            
                        </div>
                    </SwipeableListItem>
                </SwipeableList>
            </div>
            ))}
        </div>
        }
    </>
  )
}

export default ListExpense