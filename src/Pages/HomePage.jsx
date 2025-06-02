import React from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import Items from "../componets/Items";
import Categories from "../componets/Categories";
import ShowFullItem from "../componets/ShowFullItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      showFullItem: false,
      fullItem: {}
    };

    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategories = this.chooseCategories.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
  }

  componentDidMount() {
    // Загружаем все товары при загрузке страницы
    fetch('http://localhost:8000/api/items')
      .then(res => res.json())
      .then(data => this.setState({ currentItems: data }))
      .catch(err => console.error('Ошибка при загрузке товаров:', err));
  }

  chooseCategories(categoryKey) {
    let url = 'http://localhost:8000/api/items'; // Исправлено на items вместо categories
    if (categoryKey !== 'all') {
        url += `?category=${categoryKey}`;
    }

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        })
        .then(data => this.setState({ currentItems: data }))
        .catch(err => {
            console.error('Ошибка при получении товаров:', err);
            // Добавьте здесь обработку ошибки (например, уведомление пользователя)
        });
}

  onShowItem(item) {
    this.setState({ fullItem: item, showFullItem: !this.state.showFullItem });
  }

  deleteOrder(id) {
    this.setState({
      orders: this.state.orders.filter(el => el.id !== id)
    });
  }

  addToOrder(item) {
    let isInArray = this.state.orders.some(el => el.id === item.id);
    if (!isInArray) {
      this.setState({ orders: [...this.state.orders, item] });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Header orders={this.state.orders} onDelete={this.deleteOrder} />
        <div className="presentation"></div>
        <Categories chooseCategories={this.chooseCategories} />
        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems}
          onAdd={this.addToOrder}
        />
        {this.state.showFullItem && (
          <ShowFullItem
            item={this.state.fullItem}
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
          />
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
