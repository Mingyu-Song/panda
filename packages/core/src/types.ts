import type { TransformHelpers } from '@css-panda/types'
import type { Root } from 'postcss'
import type { CSSCondition } from './css-condition'

export type TransformResult = {
  className: string
  styles: Dict
}

export type GeneratorContext = {
  root: Root
  conditions: CSSCondition
  breakpoints: Record<string, string>
  helpers: TransformHelpers
  transform: (prop: string, value: string) => TransformResult
}

export type Dict<T = any> = Record<string, T>