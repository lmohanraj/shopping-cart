import logo from "./logo.svg";
import { Row, Col, Container, Button } from "react-bootstrap";
import "./App.css";
import { useState } from "react";

function App() {

  const [data, setData] = useState([
    {id:101, name: "Fancy Product", price: "$40.00 - $80.00", inCart: false },
    {id:102, name: "Special Item", price: "$18.00", inCart: false },
    {id:103, name: "Sale Item", price: "$25.00", inCart: false },
    {id:104, name: "Popular Item", price: "$40.00", inCart: false },
    {id:105, name: "Sale Item", price: "$25.00", inCart: false },
    {id:106, name: "Fancy Product", price: "$120.00 - $280.00", inCart: false },
    {id:107, name: "Special Item", price: "$18.00", inCart: false },
    {id:108, name: "Popular Item", price: "$40.00", inCart: false },
  ]);

  const [cartCount, setCartCount] = useState(0);
  const [show, setShow] = useState(true);
  const [cartItems, setCartItems] = useState([]);


  const cartAction = ({index, item}) => {
    let newData = [...data];
    setCartCount(cartCount + 1);
    newData[index].inCart = true;
    setData(newData);
    let items = [...cartItems];
    items.push(item);
    setCartItems(items);
  }

  const removeFromCart = (id) => {
    let newData = [...data];
    for( let i=0;i<newData.length;i++){
      if(newData[i].id===id)
      newData[i].inCart=false;
    }
    setData(newData);
    setCartCount(cartCount-1);
  }

  return (
    <div>
      { show?
      <div className="cart" onClick={()=>setShow(!show)}> 
        Cart ({cartCount})
      </div> : ""
}
      <div className="header">
        <h1>Shop in style</h1>
        <h4>With this shop homepage template</h4>
      </div>
      {show?
      <Row className="row">
        {data.map((da, index) => {
          return (
            <div className="card" key={index}>
              <div className="dummy"></div>
              <Col md="3" className="content">
                <h2>{da.name}</h2>
                <p>{da.price}</p>
                {da.inCart === true ? (
                  <Button disabled>Add to cart</Button>
                ) : (
                  <Button
                    onClick={()=>cartAction({index, da})}
                  >
                    Add to cart
                  </Button>
                )}
              </Col>
            </div>
          );
        })}
      </Row>:
      <div>
        <h1>Cart Items({cartCount})</h1>
        <div className="card">
        { 
        data.filter( da => da.inCart?true:false)
        .map((da, index) => {
          return (
            <div className="card" key={index}>
              <div className="dummy"></div>
              <Col md="3" className="content">
                <h2>{da.name}</h2>
                <p>{da.price}</p>
                <button onClick={() => {
                  removeFromCart(da.id);
                }}>Remove Item</button>
              </Col> 
            </div>
        ); })}
        </div>
        <Button onClick={() => setShow(!show)}>Back to shopping</Button>
      </div>
      }
    </div>
    );
  }
      


export default App;
