type KeyFrame = {
  id: number,
  duration: number,
}

export const KEY_2014_START : number = 0
export const KEY_2014_INTRO : number = 1
export const KEY_2014_INTRO_BUBBLES : number = 2
export const KEY_2014_INEFFECT : number = 3
export const KEY_2014_INEFFECT_BUBBLES : number = 4
export const KEY_2014_DEAD : number = 5
export const KEY_2014_YEAREND : number = 6
export const KEY_2014_YEAREND_BUBBLES : number = 7
export const KEY_2014_COLLAPSE : number = 8
export const KEY_2015_START : number = 9
export const KEY_2015_COPYCAT = 10
export const KEY_2015_COPYCAT_BUBBLES = 11
export const KEY_2015_FEDERAL = 12
export const KEY_2015_FEDERAL_BUBBLES = 13
export const KEY_2015_COLLAPSE = 14

export const KEYFRAMES : KeyFrame[] = [
  {id: KEY_2014_START, duration: 5},
  {id: KEY_2014_INTRO, duration: 5},
  {id: KEY_2014_INTRO_BUBBLES, duration: 5},
  {id: KEY_2014_INEFFECT, duration: 5},
  {id: KEY_2014_INEFFECT_BUBBLES, duration: 5},
  {id: KEY_2014_DEAD, duration: 5},
  {id: KEY_2014_YEAREND, duration: 5},
  {id: KEY_2014_YEAREND_BUBBLES, duration: 5},
  {id: KEY_2014_COLLAPSE, duration: 5},
  {id: KEY_2015_START, duration: 5},
  {id: KEY_2015_COPYCAT, duration: 5},
  {id: KEY_2015_COPYCAT_BUBBLES, duration: 5},
  {id: KEY_2015_FEDERAL, duration: 5},
  {id: KEY_2015_FEDERAL_BUBBLES, duration: 5},
  {id: KEY_2015_COLLAPSE, duration: 5},
]

/**
 * Convert the duration of each keyframe into a trigger point
 *
 * The trigger point is a value between 0 and 1 which represents
 * the percentage of scroll of the timeline when the keyframe
 * should be triggerred.
 */
const total = KEYFRAMES.reduce((a, b) => a + b.duration, 0)

export const TRIGGERS : number[] = KEYFRAMES.map((keyframe, i) => {
  return (((keyframe.duration / total) * 0.5) * (i + 1))
})