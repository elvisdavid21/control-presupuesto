import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

function FilterByCategory() {

    const{ dispatch} =useBudget()

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'filter-expense', payload: {id: e.target.value}})
    }

  return (
    <div className="bg-white shadow-lg p-8 rounded-lg mb-8">
        <form >
            <div className="flex flex-col items-center md:flex-row md:items-center gap-5">
                <label htmlFor="filtro"
                    className="text-lg font-bold uppercase"
                >
                    Filtrar Gastos
                </label>
                <select name="" id="filtro"
                    className="bg-slate-100 p-3 w-full flex-1 rounded-lg"
                    onChange={handleChange}
                >
                    <option >--Todas las categorias--</option>
                    {categories.map(category => (
                        <option 
                            key={category.id}
                            value={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}

export default FilterByCategory