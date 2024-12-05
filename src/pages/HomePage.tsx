import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { AppState } from "../AppState.ts";
import CarCard from "../components/CarCard.tsx";
import CarForm from "../components/CarForm.tsx";
import { Car } from "../models/Car.ts";
import { carsService } from "../services/CarsService.ts";
import Pop from "../utils/Pop.ts";

function HomePage() {

  async function getCars() {
    try {
      console.log('getting cars')
      await carsService.getCars()
    } catch (e) {
      Pop.error(e as Error)
    }
  }

  function createCar() {
    AppState.car = Car.create()
  }


  let cars = (AppState.cars.map(c => {
    return (
      <div className="col-md-4 my-3" key={c.id}>
        <CarCard car={c} />
      </div>
    )
  }))

  useEffect(() => {
    getCars()
  }, [])

  return (
    <section className="home-page">
      {/* CARS */}
      <div className="container my-3">
        <div className="row">
          {cars}
        </div>
        <div className="row sticky-bottom">
          <div className="col-12 text-end">
            <button className="btn btn-dark" title="Sell Car" onClick={createCar} data-bs-toggle="modal" data-bs-target="#carModal">
              <span className="display-6">🏎️</span>
            </button>
          </div>
        </div>
      </div>


      {/* BOOTSTRAP MODAL */}
      <div className="modal fade" id="carModal" tabIndex={-1} aria-labelledby="carModalLabel">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Car</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {AppState.car ? <CarForm /> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default observer(HomePage)