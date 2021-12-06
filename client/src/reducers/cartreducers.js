import {CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, CART_UNSAVE_SHIPPING_ADDRESS} from "../constants/Cartconstants";
import {CART_EMPTY} from "../constants/OrderConstants";

export const cartReducer=(state={cartItems:[]},action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            //Getting object in payload
            const Item=action.payload;
            //Cgecking if item exists in cartitems
            const existitem=state.cartItems.find((x)=>x.product===Item.product);
            //If items exist's we'll replace existing same item with cuurent same item so that data is updated
            if(existitem){
                return {...state,cartItems:state.cartItems.map((x)=>x.product===Item.product?Item:x)}
            }
            else{
                return {...state,cartItems:[...state.cartItems,Item]}
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((itm)=>itm.product!==action.payload),
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress:action.payload,
            }
        case CART_UNSAVE_SHIPPING_ADDRESS:
            return{
                ...state,shippingAddress:{},
            }    
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod:action.payload,
            }  
        case CART_EMPTY:
return {
    ...state,cartItems:[],
}
        default:
            return state;
    }
}