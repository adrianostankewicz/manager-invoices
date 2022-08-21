import { Calendar, CurrencyDollar, Receipt } from 'phosphor-react'
import MILogoUrl from '../../assets/logo-manager-invoices.png'

export function Header(){
  return(
    <nav className='px-3 flex justify-between items-center 
                  bg-slate-700 h-14'>
      <a href="#" className='flex items-center'>
        <img src={MILogoUrl} alt="Logo da Manager Invoices" className='w-8 h-8 rounded-sm'/>
        <span className='px-2 text-white text-lg'>Manager Invoices</span>
      </a>
      <div className='flex my-2 mx-1 justify-between items-center'>
        <a href='#' 
          className='flex py-2 px-4 my-2 mx-1 bg-gray-400 hover:bg-cyan-400 rounded-md 
                        text-center text-white'>
            <Calendar className='w-6 h-6'/> 
            <span>Histórico</span> 
        </a>
        <a href='#' 
          className='flex py-2 px-4 my-2 mx-1 bg-gray-400 hover:bg-cyan-400 rounded-md 
                        text-center text-white'>
            <Receipt className='w-6 h-6'/> 
            <span>Lançar Nota Fiscal</span>
        </a>
        <a href='#' 
          className='flex py-2 px-4 my-2 mx-1 bg-gray-400 hover:bg-cyan-400 rounded-md 
                        text-center text-white'>
            <CurrencyDollar className='w-6 h-6'/>
            <span>Lançar Despesa</span> 
        </a>
        <a href='#' 
          className='py-2 px-4 my-2 mx-1 bg-gray-400 hover:bg-cyan-400 rounded-md 
                        text-center text-white'>
                    Sair
        </a>
      </div>
    </nav>
  )
}