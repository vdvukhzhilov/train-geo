export const RU_TO_GE = {
  а: 'ა',
  и: 'ი',
  э: 'ე',
  о: 'ო',
  у: 'უ',
  "т'": 'თ',
  б: 'ბ',
  с: 'ს',
  р: 'რ',
  д: 'დ',
  х: 'ხ',
  л: 'ლ',
  г: 'გ',
  н: 'ნ',
  м: 'მ',
  в: 'ვ',
  з: 'ზ',
  ж: 'ჟ',
  ш: 'შ',
  т: 'ტ',
  "г'": 'ღ',
  к: 'კ',
  "к'": 'ქ',
  п: 'პ',
  "п'": 'ფ',
  "х'": 'ჰ',
  "ц'": 'ც',
  "ч'": 'ჩ',
  "дз'": 'ძ',
  "ч": 'ჭ',
  "горл": 'ყ',
  "ц": 'წ',
  "дж": 'ჯ',
} as const;

export const RU_LETTERS = Object.keys(RU_TO_GE) as (keyof typeof RU_TO_GE)[];
