import {categories} from '../data/categories'

type InfoCategoriaProps = {
    info: string
}

function InfoCategoria({info} : InfoCategoriaProps) {

    const categoriesImagen = categories.filter(categoria => categoria.id === info)[0]
    const {name, icon} = categoriesImagen
  return (
    <>
    <div className='relative py-8'>
      <p className='text-sm absolute top-0 text-gray-400'>{name}</p>
      <div className='w-24'>
          <img src={`icono_${icon}.svg`} alt={`imagen ${name}`} />
      </div>
    </div>
      
    </>
    
  )
}

export default InfoCategoria