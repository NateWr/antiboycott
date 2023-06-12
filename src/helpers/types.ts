export type KeyFrame = {
  id: number,
  duration: number,
}

export type Trigger = {
  id: number,
  progress: number,
}

export type Law = {
  name: string,
  state: string,
  category: string,
  year: number,
  date: string,
  status: string,
  url: string,
  label: string | null,
}
