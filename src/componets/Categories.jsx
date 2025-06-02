import React, { Component } from 'react';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{ key: 'all', name: 'Все' }],
      isLoading: false,
      error: null
    };
    this._isMounted = false; // Флаг для проверки монтирования
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCategories();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchCategories = () => {
    if (this.state.isLoading) return; // Защита от повторных запросов

    this.setState({ isLoading: true });

    fetch('http://localhost:8000/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        if (this._isMounted) {
          this.setState({
            categories: [{ key: 'all', name: 'Все' }, ...data],
            isLoading: false
          });
        }
      })
      .catch((err) => {
        if (this._isMounted) {
          console.error('Ошибка загрузки категорий:', err);
          this.setState({ error: err.message, isLoading: false });
        }
      });
  };

  render() {
    const { categories, isLoading, error } = this.state;

    if (error) return <div className="error">Ошибка: {error}</div>;
    if (isLoading) return <div className="loading">Загрузка...</div>;

    return (
      <div className="categories">
        {categories.map((el) => (
          <div 
            key={el.key} 
            onClick={() => this.props.chooseCategories(el.key)}
            className="category-item"
          >
            {el.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;