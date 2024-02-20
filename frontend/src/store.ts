import { create } from "zustand";
import { User, productType } from "./utils/types";


type authStore = {
    user: User | null,
    login: (userdetails : User) =>void,
    logout : () => void
}

type cartStore ={
    items: productType[],
    addProduct: (product: productType) => void
    removeProduct: (product: productType) => void
    increaseQuantity: (product: productType) => void
    decreaseQuantity: (product: productType) => void
}

export const useStore =create<authStore>((set)=>({
    user : JSON.parse(localStorage.getItem("user")) || null,
    login : (userDetails)=>{
        set(()=>({user:userDetails}))
    },
    logout : ()=>{
        localStorage.removeItem("user")
        set(()=>({ user: null}))
    }
}))

export const useCartStore = create<cartStore>((set)=>({
    items: [],
    addProduct: (prod:productType) => {
        const product = {...prod,qty:1}
        set((state)=> ({items: [...state.items,product]}))
    },
    removeProduct: (product)=>{
        set((state)=> {
            const newProducts = state.items.filter(prod=> prod._id != product._id)
            return {
                items: newProducts
            }
        })
    },
    increaseQuantity: (product)=>{
        set((state)=> {
                
            const updatedItems=state.items.map((item)=> {
                return item._id ===product._id ?  {...item,qty:item.qty+1} : item
            })
            return {
                items: updatedItems,
              };
        })
    },
    decreaseQuantity: (product)=>{
        set((state)=> {
            const updatedItems=state.items.map((item)=> {
                return item._id ===product._id && item.qty >0 ?  {...item,qty:item.qty+-1} : item
            })
            return {
                items: updatedItems,
              };
        })
    }
}))