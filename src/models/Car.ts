type Profile = { name: string, picture: string, id: string }
export class Car {
  id: string
  createdAt?: Date
  description: string
  imgUrl: string
  make: string
  model: string
  price: number
  year: number
  creatorId?: string
  creator?: Profile
  constructor(data: Car) {
    this.id = data.id || ''
    this.createdAt = data.createdAt || new Date()
    this.description = data.description || ''
    this.imgUrl = data.imgUrl || ''
    this.make = data.make || ''
    this.model = data.model || ''
    this.price = data.price || 0
    this.year = data.year || 0
    this.creatorId = data.creatorId || ''
    this.creator = data.creator
  }

  static create() {
    return new Car({ id: '', description: '', imgUrl: '', make: '', model: '', price: 0, year: 0 })
  }
}