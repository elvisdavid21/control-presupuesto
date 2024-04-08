import {formatCurrency} from '../helpers/index'

type AmountDisplayProps = {
    label?: string,
    amount: number
}

function AmountDisplay({label, amount} : AmountDisplayProps) {
  return (
    <p className="text-3xl font-bold text-blue-600">
       {label && `${label}: `}<span className={`${amount < 0 ? 'text-red-600 font-black' : 'text-black font-black'}`}>{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay