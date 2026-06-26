export type BasePaginateRequest = {
  pageNo?: number
  pageSize?: number
}

export type BasePaginateResponse<T> = {
  data: {
    content: T[]
    pageable: {
      sort: { empty: boolean; sorted: boolean; unsorted: boolean }
      offset: number
      pageSize: number
      pageNumber: number
      paged: boolean
      unpaged: boolean
    }
    totalElements: number
    totalPages: number
    last: boolean
    size: number
    number: number
    sort: { empty: boolean; sorted: boolean; unsorted: boolean }
    numberOfElements: number
    first: boolean
    empty: boolean
  }
}
