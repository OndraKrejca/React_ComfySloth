import { act, logDOM } from '@testing-library/react'
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

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, amount } = action.payload

    const newTemp = state.cart.map((oneItem) => {
      if (oneItem.id === id) {
        if (amount === 'inc') {
          let newAmount = oneItem.amount + 1

          if (newAmount > oneItem.max) {
            newAmount = oneItem.max
          }

          return { ...oneItem, amount: newAmount }
        }

        if (amount === 'dec') {
          let newAmount = oneItem.amount - 1

          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...oneItem, amount: newAmount }
        }
      }
      return oneItem
    })

    return {
      ...state,
      cart: newTemp,
    }
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_amount, total_items } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item
        let totalPrice = price * amount

        total.total_amount += totalPrice
        total.total_items += amount

        return total
      },
      { total_amount: 0, total_items: 0 }
    )

    return {
      ...state,
      total_amount,
      total_items,
    }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
