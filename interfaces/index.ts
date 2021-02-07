export type mealType = 'BR' | 'LU' | 'DN'

export type menu = {
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

export type restaurant = {
  id: number,
  code: string,
  name_kr: string,
  name_en: string,
  addr: string,
  lat: string,
  lng: string,
  etc: string,
  created_at: string,
  updated_at: string,
  menus: menu[],
}

export type day = {
  date: string,
  BR: restaurant[],
  LU: restaurant[],
  DN: restaurant[]
}