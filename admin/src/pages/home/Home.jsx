import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { stateGetProduct, stateGetUser } from "../../redux/apiCalls";

export default function Home() {
    const [userStats, setUserStats] = useState([]);
    const dispatch = useDispatch();

    const MONTHS = useMemo(
        () => [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"
        ],
        []
    );

    useEffect(() => {
        stateGetUser(dispatch);
        stateGetProduct(dispatch);
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats", {
                    headers: {
                        token: "Bearer " + JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken,
                    },
                });
                const list = res.data.sort((a, b) => {
                    return a._id - b._id;
                });
                list.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Active User": item.total },
                    ])
                );
            } catch { }
        }
        getStats();
    }, [MONTHS, dispatch]);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
