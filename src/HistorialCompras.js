import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HistorialCompra.css'

function HistorialCompras() {
  const { shop_id } = useParams();
  const [historiales, setHistoriales] = useState([]);
  const [productos, setProductos] = useState([]);
  const [shopId, setShopId] = useState(shop_id);

  useEffect(() => {
    const get_historial_compras = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/react/shop/${shopId}/historial_de_compras`);
        const data = response.data;
        setHistoriales(data.historiales)
        setProductos(data.productos)
      } catch (error) {
      }
    };

    get_historial_compras();
  }, []);

  return (
    <>
      <div className="NavBar-Container">
        <nav className="NavBar grid">
          <li><a href="{% url 'shop' shop_id %}">Volver a la tienda</a></li>
        </nav>
      </div>

      <div className="Contenido">
        <h1>Historial de Compras</h1> 
      
        <form className="Form" method="POST">
          <p>
            <label htmlFor="product_provider">Product provider: </label>
            <select id="product_provider" style={{width: '200px'}}  name="product_provider">
              {productos.map(product =>
                <option key={product.id} value={product.id}>{product.name}</option>
              )}
            </select>
          </p>

          <p>
            <label htmlFor="amount">Amount: </label>
            <input required type="number" name="amount" id="amount" />
          </p>

          <p>
            <label htmlFor="unit_price">Unit price: </label>
            <input required type="number" step="0.001" name="unit_price" id="unit_price" />
          </p>

          <p>
            <label htmlFor="package">Package?: </label>
            <input required type="text" name="package" id="package" />
          </p>

          <p>
            <label htmlFor="unit_price_pack">Unit price from package: </label>
            <input required type="number" name="unit_price_pack" id="unit_price_pack" />
          </p>
          <button>Crear nuevo pedido</button>
        </form>
        
        <div className="Contenedor-Tabla Tabla-larga">
          <table>
            <thead>
              <tr> 
                <th>Product</th>
                <th>Amount</th>
                <th>Unit Price</th>
                <th>Costo Total</th>
                <th>Purchase Date</th>
                <th>Provider</th>
                <th>Unidades por pack</th>
                <th>Package</th>
              </tr>
            </thead>
            
            <tbody>
              {historiales.map(historial =>
                <tr key={historial.id}>
                  <td>{historial.product_provider}</td>
                  <td>{historial.amount}</td>
                  <td>{historial.unit_price}</td>
                  <td>{historial.total_cost}</td>
                  <td>{historial.purchase_date}</td>
                  <td>{historial.product_providerprovider}</td>
                  <td>{historial.num_units_from_pack}</td>
                  <td>{historial.package}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default HistorialCompras;
