import React from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import Items from "../componets/Items";
import Categories from "../componets/Categories";
import SearchBar from '../componets/SearchBar';
import { useAuth } from "../auth/authContext";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      userId: props.user?.id || null
    };
  }

  componentDidMount() {
    this.loadItems();
    if (this.state.userId) {
      this.loadUserCart();
    }
  }

  loadUserCart = () => {
    fetch(`http://localhost:8000/api/cart/${this.state.userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
      .then(res => res.json())
      .then(cartItems => {
        const enrichedItems = cartItems.map(cartItem => ({
          ...cartItem.item,
          cartId: cartItem.id,
          count: cartItem.count
        }));
        this.setState({ orders: enrichedItems });
      })
      .catch(err => console.error('Ошибка загрузки корзины:', err));
  }

  loadItems = (categoryKey = 'all') => {
    let url = 'http://localhost:8000/api/items';
    if (categoryKey !== 'all') {
      url += `?category=${categoryKey}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ currentItems: data }))
      .catch(err => console.error('Ошибка:', err));
  }

  chooseCategories = (categoryKey) => {
    this.loadItems(categoryKey);
  }

  updateQuantity = async (cartId, newCount) => {
    if (newCount < 1) return;

    const { userId } = this.state;

    try {
      this.setState(prev => ({
        orders: prev.orders.map(item =>
          item.cartId === cartId ? { ...item, count: newCount } : item
        )
      }));

      if (userId) {
        const response = await fetch(`http://localhost:8000/api/cart/${cartId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
          },
          body: JSON.stringify({ count: newCount })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Ошибка обновления количества');
        }
      }
    } catch (err) {
      console.error('Ошибка:', err);
    }
  }

  addToOrder = async (item) => {
    const { userId, orders } = this.state;
    const existingItem = orders.find(el => el.id === item.id);

    try {
      if (existingItem) {
        await this.updateQuantity(existingItem.cartId, existingItem.count + 1);
      } else {
        if (userId) {
          const response = await fetch('http://localhost:8000/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({
              id_user: userId,
              id_item: item.id,
              count: 1
            })
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add item');
          }

          const newCartItem = await response.json();

          this.setState(prev => ({
            orders: [...prev.orders, {
              ...item,
              cartId: newCartItem.id,
              count: 1
            }]
          }));
        } else {
          this.setState(prev => ({
            orders: [...prev.orders, {
              ...item,
              cartId: Date.now(),
              count: 1
            }]
          }));
        }
      }
    } catch (err) {
      console.error('Ошибка при добавлении товара:', err);
      alert(`Ошибка: ${err.message}`);
    }
  }

  deleteOrder = (cartId) => {
    if (this.state.userId) {
      fetch(`http://localhost:8000/api/cart/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })
        .then(() => {
          this.setState(prev => ({
            orders: prev.orders.filter(item => item.cartId !== cartId)
          }));
        })
        .catch(err => console.error('Ошибка удаления:', err));
    } else {
      this.setState(prev => ({
        orders: prev.orders.filter(item => item.cartId !== cartId)
      }));
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          onUpdateQuantity={this.updateQuantity}
          userId={this.state.userId}
        />
        <div className="presentation"></div>
        {/* <SearchBar onSearchSelect={(item) => this.setState({ currentItems: [item] })} /> */}
        <Categories chooseCategories={this.chooseCategories} />
        <Items
          items={this.state.currentItems}
          onAdd={this.addToOrder}
        />
        <Footer />
      </div>
    );
  }
}

export default function HomePageWrapper() {
  const { user } = useAuth();
  return <App user={user} />;
}
