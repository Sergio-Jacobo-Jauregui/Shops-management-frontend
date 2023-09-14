import NavBar from "./NavBar";
import axios from 'axios';
import CatImage from './cat.jpeg';
import { useState, useEffect } from "react";

function Home() {
  const [shopsData, setShopsData] = useState([]);

  useEffect(() => {
    const get_shops = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/react/home');
        const data = response.data;
        setShopsData(data);
      } catch (error) {
      }
    };

    get_shops();
  }, []);


  return (
    <>
      <NavBar/>
      <div>
        <div></div>
        <div>
          {shopsData.map(shop => (
            <Card key={shop.id} id={shop.id} name={shop.name} addres={shop.addres} money={shop.money}/>
          ))}
        </div>
      </div>
    </>
  );
};

function Card({ name, addres, money, id }) {
  return (
    <>
      <div className="card" style={{width: '18rem'}}>
        <img src={CatImage} className="card-img-top" style={{height: '150px'}}/>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Addres: {addres}</p>
          <p className="card-text">Money: {money}</p>
          <a href={`http://localhost:3000/shop/${id}`} className="btn btn-primary">Ir a la tienda</a>
        </div>
      </div>
    </>
  );
}

export default Home;
