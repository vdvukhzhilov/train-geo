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
  х: 'Ხ',
  л: 'Ლ',
  г: 'Გ',
} as const;

export const RU_LETTERS = Object.keys(RU_TO_GE) as (keyof typeof RU_TO_GE)[];
