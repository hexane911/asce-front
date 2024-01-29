import './loader.css'
import loaderSVG from '../assets/img/loader.svg'


const Loader = () => {
    return <div className="loader">
        <img src={loaderSVG} alt="" className="loader__img" />
    </div>
}

export default Loader