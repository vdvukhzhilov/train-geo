const MAX_DOUBLES_TRIES = 10;

export function getRandomArrayElements<Array extends unknown[]>(
  array: Array,
  elementsCount: number,
  doublesAllowed = true
): Array[number][] {
  let result = [];
  let doublesTries = 0;

  const arrayLength = array.length;

  for (let i = 0; i < elementsCount; i++) {
    let element = array[Math.floor(Math.random() * arrayLength)];

    if (doublesAllowed) {
      result.push(element);
    }

    if (!doublesAllowed) {
      while (result[result.length - 1] === element && doublesTries < MAX_DOUBLES_TRIES) {
        element = array[Math.floor(Math.random() * arrayLength)];
      }
      result.push(element);
    }
  }

  return result;
}
