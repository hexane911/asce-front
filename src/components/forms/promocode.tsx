import { useState } from 'react'
import Button from '../button'
import './input.css'
import './promocode.css'
import checkmark from '../../assets/img/checkmark-white.svg'

const Promocode = () => {

    const [code, setCode] = useState("")

    return <div className="promo input__box">
        <label className='input__label gradi'>Промокод</label>
        <div className="promo__box">
            <input placeholder='Введите ваш промокод' value={code} onChange={e => setCode(e.target.value)} type="text" className="promo__input input" />
            <Button variant='black' className='promo__button' disabled={!code}>Активировать <img src={checkmark} /></Button>
        </div>
    </div>
}

export default Promocode