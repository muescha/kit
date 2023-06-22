import { ChildProcess } from "child_process"
import { ProcessType, UI, Mode } from "../core/enum.js"
import { Field } from "./kitapp.js"

export interface Choice<Value = any> {
  name: string
  value?: Value
  description?: string
  focused?: string
  img?: string
  icon?: string
  html?: string
  hasPreview?: boolean
  preview?:
    | string
    | ((
        input: string,
        state: AppState
      ) => string | Promise<string>)
  previewLang?: string
  id?: string
  shortcode?: string[]
  className?: string
  nameClassName?: string
  tagClassName?: string
  descriptionClassName?: string
  tag?: string
  shortcut?: string
  drag?:
    | {
        format?: string
        data?: string
      }
    | string
  onFocus?: (
    input: string,
    state: AppState
  ) => string | Promise<string>
  onSubmit?: (
    input: string,
    state: AppState
  ) => string | Promise<string>
  enter?: string
  disableSubmit?: boolean
  info?: undefined | "always" | "onNoChoices"
  height?: number
  skip?: boolean
  miss?: boolean
  pass?: boolean
  group?: string
  userGrouped?: boolean
  choices?: (Omit<Choice<any>, "choices"> | string)[]
  hideWithoutInput?: boolean
}

export interface ScoredChoice {
  item: Choice<{ id: string; name: string; value: any }>
  score: number
  matches: {
    [key: string]: [number, number][]
  }
  _: string
}

export interface ScriptPathInfo {
  command: string
  filePath: string
  kenv: string
  id: string
  icon?: string
  timestamp?: number
  needsDebugger?: boolean
  compileStamp?: number
  compileMessage?: string
}

export interface ScriptMetadata {
  shebang?: string
  name?: string
  menu?: string
  description?: string
  shortcut?: string
  shortcode?: string[]
  friendlyShortcut?: string
  alias?: string
  author?: string
  twitter?: string
  github?: string
  social?: string
  social_url?: string
  exclude?: boolean
  schedule?: string
  system?: string
  watch?: string
  background?: string
  type: ProcessType
  timeout?: number
  tabs?: string[]
  tag?: string
  log?: "true" | "false"
  hasFlags?: boolean
  cmd?: string
  option?: string
  ctrl?: string
  shift?: string
  hasPreview?: boolean
  logo?: string
  snippet?: string
  snippetdelay?: number
  index?: string
  template?: boolean
  ["color-text"]?: string
  ["color-primary"]?: string
  ["color-secondary"]?: string
  ["color-background"]?: string
  ["opacity"]?: string
  preview?: Choice["preview"]
  debug?: boolean
  verbose?: boolean
  cache?: boolean
  note?: string
  group?: string
}

export type Script = ScriptMetadata &
  ScriptPathInfo &
  Choice

export type PromptBounds = {
  x?: number
  y?: number
  width?: number
  height?: number
}

// export type PromptState = "collapsed" | "expanded"

export type PromptDb = {
  screens: {
    [screenId: string]: {
      [script: string]: PromptBounds
    }
  }
}

export type InputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"

export type Shortcut = {
  key: string
  name?: string
  value?: any
  onPress?: (
    input: string,
    state: AppState
  ) => void | Promise<void>
  bar?: "right" | "left" | ""
  flag?: string
  condition?: (choice: any) => boolean
}

export interface PromptData {
  id: string
  key: string
  scriptPath: string
  description: string
  flags: FlagsOptions
  hasPreview: boolean
  keepPreview?: boolean
  hint: string
  ignoreBlur: boolean

  input: string
  kitArgs: string[]
  kitScript: string
  mode: Mode
  name: string
  placeholder: string
  preview: string
  previewWidthPercent: number
  panel: string
  secret: boolean
  selected: string
  strict: boolean
  tabs: string[]
  tabIndex: number
  type: InputType
  ui: UI
  resize: boolean
  placeholderOnly: boolean
  scripts: boolean
  onInputSubmit: { [key: string]: any }
  defaultChoiceId: string
  footer: string
  env: any
  shortcuts: Shortcut[]
  enter: string
  choicesType:
    | "string"
    | "array"
    | "function"
    | "async"
    | "null"
  x: number
  y: number
  width: number
  height: number
  itemHeight: number
  inputHeight: number
  defaultValue: string
  formData?: any
  html?: string
  theme?: any
  alwaysOnTop?: boolean
  cwd?: string
  hasOnNoChoices?: boolean
  inputCommandChars?: string[]
  inputClassName?: string
  headerClassName?: string
  footerClassName?: string
  preload?: boolean
}

export interface GenerateChoices {
  (input: string): Choice<any>[] | Promise<Choice<any>[]>
}

export type Choices<Value> = (
  | (string | Choice)[]
  | Choice<Value>[]
  | (() => Choice<Value>[])
  | (() => Promise<Choice<Value>[]>)
  | Promise<Choice<any>[]>
  | GenerateChoices
) & {
  preload?: boolean
}

export type Panel =
  | string
  | void
  | (() => string)
  | (() => void)
  | (() => Promise<string>)
  | (() => Promise<void>)
  | ((input: string) => string)
  | ((input: string) => void)
  | ((input: string) => Promise<any>)
  | ((input: string) => Promise<void>)

export type FlagsWithKeys = {
  [key: string]: {
    shortcut?: string
    name?: string
    group?: string
    description?: string
    bar?: "left" | "right"
    flag?: string
    preview?: Choice["preview"]
  }
} & {
  sortChoicesKey?: string[]
  order?: string[]
}
export type FlagsOptions = FlagsWithKeys | boolean

export interface AppState {
  input?: string
  inputChanged?: boolean
  flaggedValue?: any
  flag?: string
  tab?: string
  tabIndex?: number
  value?: any
  index?: number
  focused?: Choice
  history?: Script[]
  modifiers?: string[]
  count?: number
  name?: string
  description?: string
  script?: Script
  submitted?: boolean
  shortcut?: string
  paste?: string
  isPasteImage?: boolean
  cursor?: number
}

export interface ChannelHandler {
  (input?: string, state?: AppState): void | Promise<void>
}

export type PromptConfig = {
  validate?: (
    choice: string
  ) => boolean | string | Promise<boolean | string>
  choices?: Choices<any> | Panel
  html?: string
  formData?: any
  className?: string
  flags?: FlagsOptions
  preview?:
    | string
    | ((
        input: string,
        state: AppState
      ) => string | Promise<string> | void | Promise<void>)
  panel?: string | (() => string | Promise<string>)
  onNoChoices?: ChannelHandler
  onEscape?: ChannelHandler
  onAbandon?: ChannelHandler
  onBack?: ChannelHandler
  onForward?: ChannelHandler
  onUp?: ChannelHandler
  onDown?: ChannelHandler
  onLeft?: ChannelHandler
  onRight?: ChannelHandler
  onTab?: ChannelHandler
  onInput?: ChannelHandler
  onChange?: ChannelHandler
  onBlur?: ChannelHandler
  onChoiceFocus?: ChannelHandler
  onMessageFocus?: ChannelHandler
  onPaste?: ChannelHandler
  onDrop?: ChannelHandler
  onDragEnter?: ChannelHandler
  onDragLeave?: ChannelHandler
  onDragOver?: ChannelHandler
  onInit?: ChannelHandler
  onSubmit?: ChannelHandler
  onValidationFailed?: ChannelHandler
  onAudioData?: ChannelHandler
  debounceInput?: number
  debounceChoiceFocus?: number
  onInputSubmit?: {
    [key: string]: any
  }
  env?: any
  shortcuts?: Shortcut[]
} & Partial<
  Omit<PromptData, "choices" | "id" | "script" | "preview">
>

export interface Metadata {
  [key: string]: string
}

export interface ProcessInfo {
  pid: number
  scriptPath: string
  child: ChildProcess
  type: ProcessType
  values: any[]
  date: number
}
