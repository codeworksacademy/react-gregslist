import { AppState } from "../AppState.ts";
import { Car } from "../models/Car.ts";
import { api } from "./AxiosService.ts";

class CarsService {
  async editCar(formData: Car, carId: string) {
    const res = await api.put(`api/cars/${carId}`, formData)
    console.log('[edit car]', res.data);
    let oldCarIndex = AppState.cars.findIndex(c => c.id == carId)
    AppState.cars.splice(oldCarIndex, 1, new Car(res.data))
  }

  async removeCar(carId: string) {
    const res = await api.delete('api/cars/' + carId)
    console.log('[removing car]', res.data);
    AppState.cars = AppState.cars.filter(car => car.id != carId)
  }

  async createCar(formData: Car) {
    const res = await api.post('api/cars', formData)
    console.log('[create car]', res.data);
    let actualCar = new Car(res.data)
    AppState.cars.push(actualCar)
  }


  async getCars() {
    if (AppState.cars.length) { return }
    const response = await api.get('api/cars')
    console.log('[get cars]', response.data)
    AppState.cars = response.data.map((car: Car) => new Car(car))
  }

  async getCarById(carId: string) {
    if (AppState.car?.id == carId) { return }
    AppState.car = null
    const response = await api.get('api/cars/' + carId)
    console.log('[get car by id]', response.data)
    AppState.car = new Car(response.data)
  }

}

export const carsService = new CarsService()