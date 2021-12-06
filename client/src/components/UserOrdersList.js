import React, { useEffect } from "react";
import { mineOrderList } from "../actions/OrderActions";
import { useSelector, useDispatch } from "react-redux";
import ErrMessg from "./ErrMessDisplay";
import Loadingcomp from "./Loadingcomp";
import { useHistory } from "react-router";
import Topivgive from "./TopicComp";

const UserOrderList = () => {
  const history = useHistory();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading: listloading, error: listerror, orders } = orderMineList;
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, error, UserInfo } = UserDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if (UserInfo) {
      dispatch(mineOrderList());
    } else if (!UserInfo) {
      history.push("/signin");
    } else {
      history.push("/signin");
    }
  }, [UserInfo, dispatch]);

  return listloading ? (
    <Loadingcomp></Loadingcomp>
  ) : listerror ? (
    <ErrMessg>{error}</ErrMessg>
  ) : (
    <>
      <Topivgive a1="zoom-out" a2="zoom-in" title="Your Order Status!" />
      <div className="container row mx-auto">
        <div className="col-12 col-lg-12 col-lg-12">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalprice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td>
                    <button
                      className="container"
                      onClick={() => {
                        history.push(`/orderscreen/${order._id}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserOrderList;
