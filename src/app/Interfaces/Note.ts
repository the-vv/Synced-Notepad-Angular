export default interface Note { 
  uid?: String,
  id: String,
  title: String,
  description: String,
  created?: String,
  hashTags?: any[],
  images?: any
  [prop: string]: any
}
