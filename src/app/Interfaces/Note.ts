export default interface Note { 
  uid?: String,
  id: String,
  title: String,
  description: String,
  timestamp?: any,
  hashTags?: any[],
  images?: any
  [prop: string]: any
}
