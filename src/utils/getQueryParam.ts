const getQueryParam = (value: Record<string, any>) => {
  const removeEmpty = Object.fromEntries(
    Object.entries(value).filter(([_, v]) => !!v)
  )
  return `?${new URLSearchParams(removeEmpty)}`
}

export default getQueryParam
