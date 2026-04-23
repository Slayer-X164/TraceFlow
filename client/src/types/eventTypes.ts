export interface eventDataType {
  colno: number
  error: string
  eventType: string
  filename: string
  lineno: number
  message: string
  timestamp: string
  url: string
}
export interface groupEvent {
  [fingerprint: string]: {
    event: eventDataType,
    count: number
  }
}