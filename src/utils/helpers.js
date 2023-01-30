export const formatPrice = (price) => {

    const newPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((price / 100).toFixed(2))
    return newPrice
}

export const getUniqueValues = () => { }
