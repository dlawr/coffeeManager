'use strict';
console.log('react linked');

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');






const App = React.createClass({

  getInitialState : function() {
    return {
      orders : {},
      menu: {}
    }
  },
  componentDidMount:function() {
    // this is where you'll get the data from the 'db'
    $.get('/beverages').done((data) => {
      // for each to push each object into an object instead of array
      data.forEach((el) => {
        this.state.orders[el.order_id] = el;
      });
      this.setState({orders: this.state.orders});
    });

    $.get('/menu').done((data) => {

      data.forEach((el) => {
        this.state.menu[el.item_id] = el;
      });
      this.setState({ menu: this.state.menu });
    })
  },

  addMenuItem : function(item) {
    //let timestamp = new Date().getTime();
    let that = this;

    $.post('/menu', item)
      .done( (data) => {
        this.state.menu[data.item_id] = item;
        this.setState({ menu: this.state.menu});
      });
  },
  addOrder : function(order) {
    let that = this;

    $.post('/beverages', order)
      .done( (data) => {
        that.state.orders[data.order_id] = order;
        that.setState({ orders: that.state.orders });
      });
  },
  renderMenu : function(key) {
    return (
      <ItemForm key={key} index={key} details={this.state.menu[key]} addOrder={this.addOrder} />
    )
  },

  render : function() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <ul className="col s4">
              <li><h4>Menu Items</h4></li>

              {Object.keys(this.state.menu).map(this.renderMenu)}

            </ul>
            <ul className="col s8">
              <li><h4>Order Queue</h4></li>



            </ul>
          </div>
          <CreateOrderForm addMenuItem={this.addMenuItem} />
        </div>
      </div>
    )
  }
});










const CreateOrderForm = React.createClass({
  handleSubmit : function(event) {
    event.preventDefault();

    let drink_name = this.refs.drink_name.value; 
    let price = +(this.refs.price.value);

    let item = {
      item_name: drink_name,
      base_price: price
    }

    this.props.addMenuItem(item);
    this.refs.menuForm.reset();
  },

  render : function() {
    return (
      <div>
        <div className="row">
          <div className="col s4">

            <h5>Add New Menu Item</h5>

            <form ref="menuForm" onSubmit={this.handleSubmit} >
              <div className="input-field">
                <input type="text" id="drink_name" ref="drink_name" />
                <label for="drink_name">Drink Name</label>
              </div>
              <div className="input-field">
                <input type="text" id="price" ref="price" />
                <label for="price">Base Price</label>
              </div>
              <div className="input-field">
                <input type="submit" value="New Menus Item" className="waves-effect waves-light btn" />
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
});


const ItemForm = React.createClass({

  handleSubmit : function(event) {
    event.preventDefault();

    let drink_name = this.refs.drink_name.value;
    let size = this.refs.size.value;
    let price = +(this.refs.price.value);
    let comments = this.refs.comments.value;

    let order = {
      drink_name: drink_name,
      size: size,
      price: price,
      comments: comments,
      ready: false
    }

    this.props.addOrder(order);

    this.refs.orderForm.reset();
  },

  render : function() {
    return (
      <li>
        <div>
          <form ref="orderForm" onSubmit={this.handleSubmit}>
            <input type="text" ref="drink_name" value={this.props.details.item_name} disabled />
            <select ref="size">
              <option value="1">S</option>
              <option value="2">M</option>
              <option value="3">L</option>
            </select>
            <div className="input-field">
              <input type="text" ref="price" value={this.props.details.base_price} disabled />
            </div>
            <div className="input-field">
              <input type="text" ref="comments" id="comments"/>
              <label for="comments">Comments</label>
            </div>
            <button type="submit" className="waves-effect waves-light btn">Add To Order</button>
          </form>
        </div>
      </li>
    )
  }
});




let $container = document.getElementById('container');
ReactDOM.render(<App />, $container);