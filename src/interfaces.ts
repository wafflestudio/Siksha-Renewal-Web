export type Meal = 'BR' | 'LU' | 'DN'

export type Menu = {
  id: number,
  code: string,
  name_kr: string,
  name_en: string,
  price: number,
  etc: string,
  created_at: string,
  updated_at: string,
  score: number,
  review_cnt: number
}

export type Restaurant = {
  id: number,
  code: string,
  name_kr: string,
  name_en: string,
  addr: string,
  lat: string,
  lng: string,
  etc: {
    operating_hours: {
      holiday: string[],
      saturday: string[],
      weekdays: string[]
    }
  },
  created_at: string,
  updated_at: string,
  menus: Menu[],
}

export type Day = {
  date: string,
  BR: Restaurant[],
  LU: Restaurant[],
  DN: Restaurant[]
}

export type Data = {
  count: number,
  result: Day[]
}

export type Week = 'holiday' | 'saturday' | 'weekdays'