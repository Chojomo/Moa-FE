'use client'

import { getWidth } from './calcSize'
import { Fruits } from '../constants/suikaGame/fruits'

export type FruitType = keyof typeof Fruits

export const getFruit = (fruit: FruitType) => {
  const width = getWidth()

  switch (fruit) {
    case Fruits.BLUEBERRY:
      return { radius: width / 20, mass: 0.8, label: Fruits.BLUEBERRY, score: 1 }
    case Fruits.STRAWBERRY:
      return { radius: width / 18, mass: 1, label: Fruits.STRAWBERRY, score: 3 }
    case Fruits.TANGERINE:
      return { radius: width / 12, mass: 1, label: Fruits.TANGERINE, score: 6 }
    case Fruits.TOMATO:
      return { radius: width / 10, mass: 1, label: Fruits.TOMATO, score: 10 }
    case Fruits.AVOCADO:
      return { radius: width / 8, mass: 1, label: Fruits.AVOCADO, score: 15 }
    case Fruits.KOREANMELON:
      return { radius: width / 7, mass: 1, label: Fruits.KOREANMELON, score: 21 }
    case Fruits.APPLE:
      return { radius: width / 6, mass: 1, label: Fruits.APPLE, score: 28 }
    case Fruits.PEACH:
      return { radius: width / 5.3, mass: 1, label: Fruits.PEACH, score: 36 }
    case Fruits.COCONUT:
      return { radius: width / 4.6, mass: 1, label: Fruits.COCONUT, score: 45 }
    case Fruits.MELON:
      return { radius: width / 3.95, mass: 1, label: Fruits.MELON, score: 55 }
    case Fruits.WATERMELON:
      return { radius: width / 3.5, mass: 1, label: Fruits.WATERMELON, score: 66 }
    case Fruits.GOLDWATERMELON:
      return { radius: width / 3.5, mass: 1, label: Fruits.GOLDWATERMELON, score: 100 }
    default:
      return undefined
  }
}

export const getRandomFruit = () => {
  const fruits = Object.values(Fruits).slice(0, 5)
  const index = Math.floor(Math.random() * fruits.length)
  return getFruit(fruits[index])
}
