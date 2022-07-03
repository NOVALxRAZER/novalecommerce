import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { deleteCart } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import { newUserOrder } from "../redux/apiCalls";

const Success = () => {
const location = useLocation();
const data = location.state.stripeData;
const cart = location.state.cart;
const currentUser = useSelector((state) => state.user.currentUser);
const [orderId, setOrderId] = useState(null);
const dispatch = useDispatch();

useEffect(() => {
const createOrder = async () => {
    try {
    const res = await userRequest.post("/orders", {
        userId: currentUser._id,
        products: cart.products.map((item) => ({
        productId: item._id,
        quantity: item._quantity,
        })),
        amount: cart.total,
        address: data.billing_details.address,
    });
    setOrderId(res.data._id);
    } catch {}
};
data && createOrder();
}, [cart, data, currentUser]);

    const handleDeleteAll = (id) => {
    dispatch(deleteCart(id));
}

let r = (Math.random() + 1).toString(36).substring(7);

// let p = (Math.random() + 1).toString(36).substring(7);

const handleNewOrder = () => {
const data = {
    userId: currentUser._id,
    username: currentUser.username,
    email: currentUser.email,
    time: new Date(),
    title: r,
}
newUserOrder(dispatch, data);
// newUserOrder(dispatch({
//     userId: currentUser._id,
//     time: new Date().getTime(),
//     title: orderId,
// }))
}

const click = () => {
handleDeleteAll();
handleNewOrder();
}

// console.log(r, "id")

return (
<div
    style={{
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    }}
>
    {orderId
    ? `Order has been created successfully. Your order number is ${orderId}`
    : `Successfull. Your Order is being Prepared...`}
    <a href="/"><button style={{ padding: 10, marginTop: 20 }} onClick={ click }>Go to Homepage</button></a>
</div>
);
};

export default Success;