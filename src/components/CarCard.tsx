import { observer } from 'mobx-react';
import { AppState } from "../AppState.ts";
import { Car } from "../models/Car.ts";
import { carsService } from "../services/CarsService.ts";
import Pop from "../utils/Pop.ts";
import { Link } from 'react-router-dom';

type props = { car: Car }
export default function CarCard({ car }: props) {

  async function removeCar() {
    try {
      const yes = await Pop.confirm('Remove the car?')
      if (!yes) { return }
      await carsService.removeCar(car.id)
    } catch (e) {
      Pop.error(e as Error)
    }
  }

  const CreatorControls = observer(() => {
    return AppState.account?.id == car.creatorId
      ? <div>
        <button className="btn ms-1" type="button" onClick={removeCar} title="Delete Car!">
          <i className="mdi mdi-delete"></i>
        </button>

        <button className="btn" data-bs-toggle="modal" data-bs-target="#carModal" onClick={setActiveCar} title='edit car'>
          <i className="mdi mdi-pencil"></i>
        </button>

      </div>
      : <></>
  })


  function setActiveCar() {
    AppState.car = car
  }

  return (
    <div className="card car-card">
      <img src={car.imgUrl} alt="" />
      <div className="card-body">
        <div className="d-flex justify-content-between">

          <Link to={'/cars/' + car.id}>
            <p><b>{car.make} {car.model}</b></p>
          </Link>

          <CreatorControls />
        </div>
      </div>
    </div>
  )

}