import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { getAllOrder } from "../../ajax/backend";

export default function Sales({ branch }) {
    const [allOrder, setAllOrder] = useState(null);

    useEffect(() => {
        getAllOrder(branch, (response) => {
            setAllOrder(response);
        });
    }, [branch]);

    console.log(allOrder);

    return (
        <div style={{ height: "500px", width: "1000px" }}>
            {allOrder && (
                <LineChart
                    xAxis={[
                        {
                            data: allOrder.month,
                            scaleType: "point",
                        },
                    ]}
                    series={[
                        {
                            data: allOrder.totalOrder,
                            label: "Orders per Month",
                            color: "rgb(233, 5, 15)",
                        },
                    ]}
                    height={300}
                    width={1000}
                />
            )}
        </div>
    );
}
