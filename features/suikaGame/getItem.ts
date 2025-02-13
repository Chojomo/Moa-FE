'use client'

import { getWidth } from './calcSize'
import { Items } from '../../helper/constants/suikaGame/items'

export type ItemType = keyof typeof Items

const getItem = (item: ItemType) => {
  const width = getWidth()

  const items = {
    [Items.BLUEBERRY]: { label: Items.BLUEBERRY, radius: width / 20, mass: 0.8, score: 1 },
    [Items.STRAWBERRY]: { label: Items.STRAWBERRY, radius: width / 18, mass: 1, score: 3 },
    [Items.TANGERINE]: { label: Items.TANGERINE, radius: width / 14, mass: 1, score: 6 },
    [Items.TOMATO]: { label: Items.TOMATO, radius: width / 12, mass: 1, score: 10 },
    [Items.AVOCADO]: { label: Items.AVOCADO, radius: width / 10, mass: 1, score: 15 },
    [Items.KOREANMELON]: { label: Items.KOREANMELON, radius: width / 7, mass: 1, score: 21 },
    [Items.APPLE]: { label: Items.APPLE, radius: width / 7, mass: 1, score: 28 },
    [Items.PEACH]: { label: Items.PEACH, radius: width / 5, mass: 1, score: 36 },
    [Items.COCONUT]: { label: Items.COCONUT, radius: width / 4.5, mass: 1, score: 45 },
    [Items.MELON]: { label: Items.MELON, radius: width / 3.9, mass: 1, score: 55 },
    [Items.WATERMELON]: { label: Items.WATERMELON, radius: width / 3.5, mass: 1, score: 66 },
    [Items.GOLDWATERMELON]: {
      label: Items.GOLDWATERMELON,
      radius: width / 3.5,
      mass: 1,
      score: 100,
    },
  }

  return items[item]
}

const getRandomItem = () => {
  const items = Object.values(Items).slice(0, 5)
  const index = Math.floor(Math.random() * items.length)
  return getItem(items[index])
}

const getNextItem = (currentItem: Items) => {
  const items = Object.values(Items)
  const currentIndex = items.indexOf(currentItem)

  if (currentIndex === -1) {
    return null
  }

  const nextIndex = (currentIndex + 1) % items.length

  const nextItem = items[nextIndex]

  const item = getItem(nextItem)

  return item
}

export { getItem, getRandomItem, getNextItem }
