import type { KeyFrame, Trigger } from './types'

let i = 0;
export const KEY_TIMELINE_START : number = i++
export const KEY_2014_START : number = i++
export const KEY_2014_INTRO : number = i++
export const KEY_2014_INTRO_BUBBLES : number = i++
export const KEY_2014_INEFFECT : number = i++
export const KEY_2014_INEFFECT_HIGHLIGHT : number = i++
export const KEY_2014_DEAD : number = i++
export const KEY_2014_DEAD_HIGHLIGHT : number = i++
export const KEY_2014_YEAREND : number = i++
export const KEY_2014_COLLAPSE : number = i++
export const KEY_2015_START : number = i++
export const KEY_2015_COPYCAT : number = i++
export const KEY_2015_COPYCAT_BUBBLES : number = i++
export const KEY_2015_FEDERAL : number = i++
export const KEY_2015_COLLAPSE : number = i++
export const KEY_2016_START : number = i++
export const KEY_2016_INTRO : number = i++
export const KEY_2016_INTRO_BUBBLES : number = i++
export const KEY_2016_COLLAPSE : number = i++
export const KEY_2017_START : number = i++
export const KEY_2017_UNCONSTITUTIONAL : number = i++
export const KEY_2017_UNCONSTITUTIONAL_BUBBLES : number = i++
export const KEY_2017_LAWS_CONTINUE : number = i++
export const KEY_2017_LAWS_CONTINUE_BUBBLE : number = i++
export const KEY_2017_COLLAPSE_TOP : number = i++
export const KEY_2017_TARGET_ANYONE : number = i++
export const KEY_2017_PUBLISHER : number = i++
export const KEY_2017_PUBLISHER_HIGHLIGHT : number = i++
export const KEY_2017_PUBLISHER_HIGHLIGHT_END : number = i++
export const KEY_2017_CASE_LOST : number = i++
export const KEY_2017_SUPREME_COURT : number = i++
export const KEY_2017_COLLAPSE_ALL : number = i++
export const KEY_2018_START : number = i++
export const KEY_2018_INTRO : number = i++
export const KEY_2018_INTRO_BUBBLES : number = i++
export const KEY_2018_COLLAPSE : number = i++
export const KEY_2019_START : number = i++
export const KEY_2020_START : number = i++
export const KEY_2021_START : number = i++
export const KEY_2021_TARGETS_EXPAND : number = i++
export const KEY_2021_TARGETS_EXPAND_BUBBLES : number = i++
export const KEY_2021_COLLAPSE : number = i++
export const KEY_2022_START : number = i++
export const KEY_2022_ESG : number = i++
export const KEY_2022_ESG_BUBBLES : number = i++
export const KEY_2022_COLLAPSE : number = i++
export const KEY_2023_START : number = i++
export const KEY_2023_TARGETS_EXPAND : number = i++
export const KEY_2023_TARGETS_EXPAND_BUBBLES : number = i++
export const KEY_2023_COLLAPSE : number = i++

export const KEYFRAMES : KeyFrame[] = [
  {id: KEY_TIMELINE_START, duration: 1},
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
  {id: KEY_2016_START, duration: 5},
  {id: KEY_2016_INTRO, duration: 5},
  {id: KEY_2016_INTRO_BUBBLES, duration: 5},
  {id: KEY_2016_COLLAPSE, duration: 5},
  {id: KEY_2017_START, duration: 5},
  {id: KEY_2017_UNCONSTITUTIONAL, duration: 5},
  {id: KEY_2017_UNCONSTITUTIONAL_BUBBLES, duration: 5},
  {id: KEY_2017_LAWS_CONTINUE, duration: 5},
  {id: KEY_2017_LAWS_CONTINUE_BUBBLE, duration: 5},
  {id: KEY_2017_COLLAPSE_TOP, duration: 5},
  {id: KEY_2017_TARGET_ANYONE, duration: 5},
  {id: KEY_2017_PUBLISHER, duration: 5},
  {id: KEY_2017_PUBLISHER_HIGHLIGHT, duration: 5},
  {id: KEY_2017_PUBLISHER_HIGHLIGHT_END, duration: 5},
  {id: KEY_2017_CASE_LOST, duration: 5},
  {id: KEY_2017_SUPREME_COURT, duration: 5},
  {id: KEY_2017_COLLAPSE_ALL, duration: 5},
  {id: KEY_2018_START, duration: 5},
  {id: KEY_2018_INTRO, duration: 5},
  {id: KEY_2018_INTRO_BUBBLES, duration: 5},
  {id: KEY_2018_COLLAPSE, duration: 5},
  {id: KEY_2019_START, duration: 5},
  {id: KEY_2020_START, duration: 5},
  {id: KEY_2021_START, duration: 5},
  {id: KEY_2021_TARGETS_EXPAND, duration: 5},
  {id: KEY_2021_TARGETS_EXPAND_BUBBLES, duration: 5},
  {id: KEY_2021_COLLAPSE, duration: 5},
  {id: KEY_2022_START, duration: 5},
  {id: KEY_2022_ESG, duration: 5},
  {id: KEY_2022_ESG_BUBBLES, duration: 5},
  {id: KEY_2022_COLLAPSE, duration: 5},
  {id: KEY_2023_START, duration: 5},
  {id: KEY_2023_TARGETS_EXPAND, duration: 5},
  {id: KEY_2023_TARGETS_EXPAND_BUBBLES, duration: 5},
  {id: KEY_2023_COLLAPSE, duration: 10},
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
