import type { KeyFrame, Trigger } from './types'

let i = 0;
export const KEY_START : number = i++
export const KEY_TITLE : number = i++
export const KEY_SHOW_BILL : number = i++
export const KEY_ENERGY_BILL : number = i++
export const KEY_FIREARMS_BILL : number = i++

export const KEYFRAMES : KeyFrame[] = [
  {id: KEY_START, duration: 1},
  {id: KEY_TITLE, duration: 10},
  {id: KEY_SHOW_BILL, duration: 5},
  {id: KEY_ENERGY_BILL, duration: 5},
  {id: KEY_FIREARMS_BILL, duration: 10},
]

/**
 * Convert the duration of each keyframe into a trigger point
 *
 * The trigger point is a value between 0 and 1 which represents
 * the percentage of scroll of the step when the keyframe
 * should be triggered.
 */
const total = KEYFRAMES.reduce((a, b) => a + b.duration, 0)
let base = 0;

export const TRIGGERS : Trigger[] = KEYFRAMES.map((keyframe, i) => {
  const trigger : Trigger = {
    id: keyframe.id,
    progress: base,
  }
  base += keyframe.duration / total
  return trigger
})
