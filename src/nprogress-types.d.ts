// 进度条
declare module 'nprogress' {
  export function start(): void
  export function done(): void
  export function set(num: number): void
  export function inc(num?: number): void
  export function config(options: {
    showSpinner?: boolean
    minimum?: number
    easing?: string
    speed?: number
  })
  export function isStarted(): boolean
  export function set(options: {
    parent?: string | HTMLElement
    color?: string
    template?: string
    spinner?: string
  })
  export function configure(options: { showSpinner?: boolean; minimum?: number; easing?: string })
  export function configure(options: {
    parent?: string | HTMLElement
    color?: string
    template?: string
    spinner?: string
    barSelector?: string
    spinnerSelector?: string
    easing?: string
    speed?: number
    showSpinner?: boolean
    minimum?: number
  })

  export function configure(options: {
    barSelector?: string
    spinnerSelector?: string
    easing?: string
    speed?: number
    showSpinner?: boolean
    minimum?: number
  })
  export function configure(options: {
    barSelector?: string
    spinnerSelector?: string
    easing?: string
    speed?: number
    showSpinner?: boolean
    minimum?: number
  })
  export function configure(options: {
    barSelector?: string
    spinnerSelector?: string
    easing?: string
    speed?: number
    showSpinner?: boolean
    minimum?: number
  })
  export function configure(options: {
    barSelector?: string
    spinnerSelector?: string
    easing?: string
    speed?: number
    showSpinner?: boolean
    minimum?: number
  })
}
