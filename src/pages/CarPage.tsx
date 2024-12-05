import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { AppState } from '../AppState';
import { useEffect } from 'react';
import Pop from '../utils/Pop';
import { carsService } from '../services/CarsService';

function CarPage() {

  const { id } = useParams()
  const car = AppState.car

  async function getCar() {
    try {
      carsService.getCarById(id as string)
    }
    catch (error) {
      Pop.error(error as Error);
    }
  }

  useEffect(() => {
    getCar()
  }, [id])


  if (!car) {
    return <div>loading... <i className="mdi mdi-tire mdi-spin"></i> </div>
  }


  return (
    <div className="CarPage">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{car.make} {car.model}</h1>
          </div>
          <div className="col-12">
            <img src={car.imgUrl} alt="" className='img-fluid' />
          </div>
          <div className="col-12">
            <p>{car.description}</p>
          </div>
          <div className="col-12">
            <p>{car.year}</p>
          </div>
          <div className="col-12">
            <p>{car.price}</p>
          </div>

          <div className="creator">
            <h3>Creator</h3>
            <img src={car.creator?.picture} alt="" height={100} />
            <p>{car.creator?.name}</p>
          </div>

        </div>
      </div>
    </div>
  )

}
export default observer(CarPage)