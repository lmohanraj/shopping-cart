import { Row, Col, Button } from "react-bootstrap";
import "./App.css";
import { useState } from "react";

function DisplayCartItems(props) {
  return (
    <div className="card">
      <div className="dummy"></div>
      <Col md="3" className="content">
        <h2>{props.da.name}</h2>
        <p>{props.da.price}</p>
        <button
          onClick={() => {
            props.removeFromCart(props.da.id);
          }}
        >
          Remove Item
        </button>
      </Col>
    </div>
  );
}

function DisplayShoppingItems(props) {
  return (
    <div className="card">
      <div className="dummy"></div>
      <Col md="3" className="content">
        <h2>{props.da.name}</h2>
        <p>{props.da.price}</p>
        {props.da.inCart === true ? (
          <Button disabled>Add to cart</Button>
        ) : (
          <Button
            onClick={() =>
              props.cartAction({
                index: props.index,
                da: props.da,
              })
            }
          >
            Add to cart
          </Button>
        )}
      </Col>
    </div>
  );
}

function App() {
  const [data, setData] = useState([
    { id: 101, name: "Product 1", price: "$40.00 - $80.00", inCart: false },
    { id: 102, name: "Product 2", price: "$18.00", inCart: false },
    { id: 103, name: "Product 3", price: "$25.00", inCart: false },
    { id: 104, name: "Product 4", price: "$40.00", inCart: false },
    { id: 105, name: "Product 5", price: "$25.00", inCart: false },
    { id: 106, name: "Product 6", price: "$120.00 - $280.00", inCart: false },
    { id: 107, name: "Product 7", price: "$18.00", inCart: false },
    { id: 108, name: "Product 8", price: "$40.00", inCart: false },
  ]);

  const [cartCount, setCartCount] = useState(0);
  const [show, setShow] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const cartAction = ({ index, item }) => {
    let newData = [...data];
    setCartCount(cartCount + 1);
    newData[index].inCart = true;
    setData(newData);
    let items = [...cartItems];
    items.push(item);
    setCartItems(items);
  };

  const removeFromCart = (id) => {
    let newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === id) newData[i].inCart = false;
    }
    setData(newData);
    setCartCount(cartCount - 1);
  };

  return (
    <div>

      {show ? 
      (
        <div className="cart" onClick={() => setShow(!show)}>
         <button> Cart ({cartCount}) </button>
        </div>
      ) : ("")
      }

      <div className="header">
        <h1>Shop in style</h1>
        <h4>With this shop homepage template</h4>
      </div>

      {show ? 
      (
        <Row className="row">
          {data.map((da, index) => {
            return (
              <DisplayShoppingItems
                key={index}
                cartAction={cartAction}
                da={da}
                index={index}
              ></DisplayShoppingItems>
            );
          })}
        </Row>
      ) : 
      (
        <div>
          <div>
          <Button onClick={() => setShow(!show)}>Back to shopping</Button>
          <h1>Cart Items({cartCount})</h1>
          </div>
          <Row className="row">
            {data
              .filter((da) => (da.inCart ? true : false))
              .map((da, index) => {
                return (
                  <DisplayCartItems
                    key={index}
                    removeFromCart={removeFromCart}
                    da={da}
                  ></DisplayCartItems>
                );
              })}
          </Row>
        </div>
      )}
    </div>
  );
}

export default App;
