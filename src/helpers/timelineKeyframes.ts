import type { KeyFrame, Trigger } from './types'

export const KEY_2014_START : number = 1
export const KEY_2014_INTRO : number = 2
export const KEY_2014_INTRO_BUBBLES : number = 3
export const KEY_2014_INEFFECT : number = 4
export const KEY_2014_INEFFECT_HIGHLIGHT : number = 5
export const KEY_2014_DEAD : number = 6
export const KEY_2014_DEAD_HIGHLIGHT : number = 7
export const KEY_2014_YEAREND : number = 8
export const KEY_2014_COLLAPSE : number = 9
export const KEY_2015_START : number = 10
export const KEY_2015_COPYCAT = 11
export const KEY_2015_COPYCAT_BUBBLES = 12
export const KEY_2015_FEDERAL = 13
export const KEY_2015_COLLAPSE = 14

export const KEYFRAMES : KeyFrame[] = [
  {id: KEY_2014_START, duration: 5},
  {id: KEY_2014_INTRO, duration: 5},
  {id: KEY_2014_INTRO_BUBBLES, duration: 5},
  {id: KEY_2014_INEFFECT, duration: 3},
  {id: KEY_2014_INEFFECT_HIGHLIGHT, duration: 5},
  {id: KEY_2014_DEAD, duration: 3},
  {id: KEY_2014_DEAD_HIGHLIGHT, duration: 5},
  {id: KEY_2014_YEAREND, duration: 10},
  {id: KEY_2014_COLLAPSE, duration: 5},
  {id: KEY_2015_START, duration: 5},
  {id: KEY_2015_COPYCAT, duration: 5},
  {id: KEY_2015_COPYCAT_BUBBLES, duration: 5},
  {id: KEY_2015_FEDERAL, duration: 10},
  {id: KEY_2015_COLLAPSE, duration: 5},
]

/**
 * Convert the duration of each keyframe into a trigger point
 *
 * The trigger point is a value between 0 and 1 which represents
 * the percentage of scroll of the timeline when the keyframe
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
