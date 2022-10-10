import { IUser } from "./user";


export interface IOrder{
    _id?            : string;
    user?           : IUser | string;
    orderItems      : IOrderItem[];
    shippingaddress : ShippingAddress;
    paymentResult   : string;


    numberOfItems   : number;
    subTotal        : number;
    iva             : number;
    total           : number;

    isPaid: boolean;
    paidAt?: string;


}


export interface IOrderItem{
    _id         : string;
    title       : string;
    Size        : string;
    quantity    : string;
    slug        : string;
    image       : string;
    price       : string;
    gender      : string;


}
export interface ShippingAddress {
  
    firstName   : string;
    lastName    : string;
    address     : string;
    address2?   : string;
    zip         : string;
    city        : string;
    country     : string;
    phone       : string;
  }