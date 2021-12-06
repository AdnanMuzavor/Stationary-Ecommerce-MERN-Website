import {GET_PRODUCT_REVIEWS_FAIL, GET_PRODUCT_REVIEWS_REQUEST, GET_PRODUCT_REVIEWS_SUCCESS, PRODUCT_ADDED_DATA, PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_DELETED_DATA, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_REVIEWS_FAIL, PRODUCT_REVIEWS_REQUEST, PRODUCT_REVIEWS_SUCCESS, PRODUCT_UPDATED_DATA, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS} from "../constants/Productconstants"

//Setting state when all items rae being fetched
export const ProductListReducer=(state={loading:true,products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading:false, error:action.payload};        
        default:
            return state;
    }
}

//Setting details when individual item is being fetched

export const ProductDetailsReducer=(state={loading:true,product:{}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error:action.payload};        
        default:
            return state;
    }
}

//Setting reducer to deal with posting reviews

export const ProductReviewsReducer=(state={loading:true,review:{}},action)=>{
    switch(action.type){
        case PRODUCT_REVIEWS_REQUEST:
            return {loading:true};
        case PRODUCT_REVIEWS_SUCCESS:
            return {loading:false, review:action.payload};
        case PRODUCT_REVIEWS_FAIL:
            return {loading:false, error:action.payload};        
        default:
            return state;
    }
}


//Setting reducer to deal with posting reviews

export const GetProductReviewsReducer=(state={loading:true,reviews:[]},action)=>{
    switch(action.type){
        case GET_PRODUCT_REVIEWS_REQUEST:
            return {loading:true};
        case GET_PRODUCT_REVIEWS_SUCCESS:
            return {loading:false, reviews:action.payload};
        case GET_PRODUCT_REVIEWS_FAIL:
            return {loading:false, error:action.payload};        
        default:
            return state;
    }
}

//Deleting item reducer
export const DeleteProductReducer=(state={loading:true,deleted:{}},action)=>{
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, deleted:action.payload};
        case PRODUCT_DELETE_FAIL:
            return {loading:false, error:action.payload};
        case PRODUCT_DELETED_DATA:
            return {loading:false,deleted:{}}        
        default:
            return state;
    }
}

//Update Item Reducer
export const UpdateProductReducer=(state={loading:true,updated:{}},action)=>{
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true};
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false, updated:action.payload};
        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error:action.payload};
        case PRODUCT_UPDATED_DATA:
            return {loading:false,updated:{}}        
        default:
            return state;
    }
}

//Add Item Reducer
export const AddProductReducer=(state={loading:true,added:{}},action)=>{
    switch(action.type){
        case PRODUCT_ADD_REQUEST:
            return {loading:true};
        case PRODUCT_ADD_SUCCESS:
            return {loading:false, added:action.payload};
        case PRODUCT_ADD_FAIL:
            return {loading:false, error:action.payload};
        case PRODUCT_ADDED_DATA:
            return {loading:false,added:{}}        
        default:
            return state;
    }
}