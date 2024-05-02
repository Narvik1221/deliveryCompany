import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";


export const deleteOrderCard = async (id) => {
  const { data } = await $host.delete("api/card/" + id);
  return data;
};

export const createOrder = async (order) => {
  const { data } = await $host.post("api/order/", order);
  return data;
};
export const changeOrder = async (order) => {
  const { data } = await $host.put("api/order/", order);
  return data;
};
export const getOrder = async (id, active) => {
  const { data } = await $host.get("api/order/" + id + "/" + active);
  return data;
};
export const getOrders = async (id, active) => {
  const { data } = await $host.get("api/orders/" + id + "/" + active);
  return data;
};
export const allOrders = async ( active) => {
  const { data } = await $host.get("api/orders/"+ active);
  return data;
};

export const getCities = async ( ) => {
  const { data } = await $host.get("api/order/cities" );
  return data;
};
