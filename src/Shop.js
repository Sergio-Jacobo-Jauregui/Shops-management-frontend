import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from "./NavBar";
import './Shop.css'

function App() {
  const { shop_id } = useParams();
  const [shop, setShop] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);
  const [products_out_stock, setProducts_out_stock] = useState([]);
  const [productos_por_llegar, setProductos_por_llegar] = useState([]);
  const [historialDeVenta, setHistorialDeVenta] = useState([]);
  const [historialDeCompra, setHistorialDeCompra] = useState([]);
  const [shopProviders, setShopProviders] = useState([]);
  const [shopId, setShopId] = useState(shop_id);

  useEffect(() => {
    const get_shops = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/react/shop/${shop_id}`);
        const data = response.data;
        setShop(data.shop)
        setShopProducts(data.shopProducts)
        setProducts_out_stock(data.products_out_stock)
        setProductos_por_llegar(data.productos_por_llegar)
        setHistorialDeVenta(data.historialDeVenta)
        setHistorialDeCompra(data.historialDeCompra)
        setShopProviders(data.shopProviders)
      } catch (error) {
      }
    };

    get_shops();
  }, []);
  
  return (
    <>
      <NavBar/>
      <div className="Contenido">
        <h1 className="Titulo-Shop">{shop.name}</h1>
        <div className="Cuerpo">
          <div className="Productos" id="Productos-Stock">
            <details className="Details">
              <summary className="Productos-Titulo">Productos en la tienda</summary>
              {shopProducts.length === 0 ? <div>No Productos para mostrar</div> : 
                <div className="Contenedor-Tabla">
                  <table>
                    <tr>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Precio de compra</th>
                      <th>Precio de venta</th>
                      <th>Fecha de vencimiento</th>
                      <th>Fecha de llegada</th>
                    </tr>
                    {shopProducts.map(shopProduct => 
                      <tr key={shopProduct.id}>
                        <td>{shopProduct.product_provider__product__name}</td>
                        <td>{shopProduct.amount}</td>
                        <td>{shopProduct.purchase_price}</td>
                        <td>{shopProduct.sale_price}</td>
                        <td>{shopProduct.due_date}</td>
                        <td>{shopProduct.arrival_date}</td>
                      </tr>
                    )}
                  </table>
                </div>
              }
            </details>
          </div>
      
          <div className="Productos" id="Productos-no-Stock">
            <details className="Details">
              <summary className="Productos-Titulo">Productos agotados</summary>
              {products_out_stock.length === 0 ? <div>No Productos para mostrar</div> :
                <div className="Contenedor-Tabla">
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio de compra</th>
                        <th>Precio de venta</th>
                        <th>Fecha de vencimiento</th>
                        <th>Fecha de llegada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products_out_stock.map(productOut => 
                        <tr key={productOut.id}>
                          <td>{productOut.product_provider__product__name}</td>
                          <td>{productOut.amount}</td>
                          <td>{productOut.purchase_price}</td>
                          <td>{productOut.sale_price}</td>
                          <td>{productOut.due_date}</td>
                          <td>{productOut.arrival_date}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              }
            </details>

          </div>
        
          <div className="Productos" id="Productos-por-llegar">
            <details className="Details">
              <summary className="Productos-Titulo">Productos en camino</summary>
              { productos_por_llegar.length === 0 ? <div>No Productos para mostrar</div> :
                <div className="Contenedor-Tabla">
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio de compra</th>
                        <th>Precio de venta</th>
                        <th>Fecha de vencimiento</th>
                        <th>Fecha de llegada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productos_por_llegar.map(product => 
                        <tr key={product.id}>
                            <td>{product.product_provider__product__name}</td>
                            <td>{product.amount}</td>
                            <td>{product.purchase_price}</td>
                            <td>{product.sale_price}</td>
                            <td>{product.due_date}</td>
                            <td>{product.arrival_date}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              }
            </details>
          </div>
          
          <div className="Historial" id="Productos-historial-ventas">
            <details className="Details">
              <summary className="Productos-Titulo">Historial de Ventas</summary>
              {historialDeVenta.length === 0 ? <div>Aun no hay ventas :c</div> : 
                <div className="Contenedor-Tabla">
                  <table>
                    <thead>
                      <tr> 
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Sale Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historialDeVenta.map(historialVenta => 
                        <tr key={historialVenta.id}>
                          <td>{historialVenta.product_provider__product__name}</td>
                          <td>{historialVenta.amount}</td>
                          <td>{historialVenta.unit_price}</td>
                          <td>{historialVenta.total_price}</td>
                          <td>{historialVenta.sale_date}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              }
            </details>
                
            <div className="Boton-Falso" >
              <a href={`http://localhost:3000/shop/${shopId}/historial_ventas`}> <strong>Hacer una venta</strong> </a>
            </div>
          </div>
          
          <div className="Historial" id="Productos-historial-compras">
            <details className="Details">
              <summary className="Productos-Titulo">Historial de Compras</summary>
              { historialDeCompra.length === 0 ? <div>Aun no hay compras :c</div> :
                <div className="Contenedor-Tabla">
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
                      { historialDeCompra.map(historialCompra => 
                        <tr key={historialCompra.id}>
                          <td>{historialCompra.product_provider__product__name}</td>
                          <td>{historialCompra.amount}</td>
                          <td>{historialCompra.unit_price}</td>
                          <td>{historialCompra.total_cost}</td>
                          <td>{historialCompra.purchase_date}</td>
                          <td>{historialCompra.product_providerprovider}</td>
                          <td>{historialCompra.num_units_from_pack}</td>
                          <td>{historialCompra.package}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              }
            </details>

            <div className="Boton-Falso" >
              <a href={`http://localhost:3000/shop/${shopId}/historial_compras`}> <strong>Hacer Pedidos</strong> </a>
            </div>
          </div>
          
          <div className="Proveedores" id="Proveedores">
            <h3>Proveedores</h3>
            <ul>
              { shopProviders.map(provider => 
                <li key={provider.id}>
                  {provider.name} 
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
