import { useNavigate, useParams } from "react-router-dom"
import { useGetOrderQuery } from "../../redux/order.api"
import Loader from "../loader"
import { useCookies } from "react-cookie"
import BannerPage from "./banner.page"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCart } from "../../redux/cart.slice"

const OrderPage = () => {
    const {orderId} = useParams()
    const {data: order, isLoading} = useGetOrderQuery(orderId ? +orderId : 0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cookies] = useCookies()
    const buyerId = cookies.b


    useEffect(() => {
        if (order && order.buyer_id === buyerId && order.status === "paid") {
            dispatch(setCart([]))
        }
    }, [order, buyerId])

    if (!buyerId) {
        navigate("/")
    }

    if (isLoading) {
        return <Loader />
    }

    if (order && order.buyer_id === buyerId) {
        return <BannerPage state={order.status === "paid" ? "success" : 'order-rejected'} />
    }
    if (order && order.buyer_id !== buyerId) {
        navigate("/404")
    }

}

export default OrderPage