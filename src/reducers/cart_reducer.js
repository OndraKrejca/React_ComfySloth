import { act } from '@testing-library/react'
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tempItem = state.cart.find((oneItem) => oneItem.id === id + color)

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount

          if (newAmount > state.cart.max) {
            newAmount = cartItem.max
          }

          return { ...cartItem, amount: newAmount }
        } else {
          return cartItem
        }
      })

      return {
        ...state,
        cart: tempCart,
      }
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color: color,
        amount: amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return {
        ...state,
        cart: [...state.cart, newItem],
      }
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const newItem = state.cart.filter((oneItem) => {
      return oneItem.id !== action.payload
    })

    return {
      ...state,
      cart: newItem,
    }
  }

  if (action.type === CLEAR_CART) {
    return {
      cart: [],
      total_items: 0,
      total_amount: 0,
      shipping_fee: 534,
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
