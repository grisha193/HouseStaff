import React, { Component } from 'react';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{ key: 'all', name: 'Все' }],
      isLoading: false,
      error: null
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchCategories();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchCategories = () => {
    if (this.state.isLoading) return;

    this.setState({ isLoading: true });

    fetch('http://localhost:8000/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        if (this._isMounted) {
          const transformed = data.map(cat => ({
            key: cat.key || String(cat.id),
            name: cat.name
          }));
          this.setState({
            categories: [{ key: 'all', name: 'Все' }, ...transformed],
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

  handleCategoryClick = (key) => {
    if (this.props.chooseCategories) {
      this.props.chooseCategories(key);
    }
  };

  render() {
    const { categories, isLoading, error } = this.state;
    const activeCategory = this.props.activeCategory || 'all';

    if (error) return <div className="error">Ошибка: {error}</div>;
    if (isLoading) return <div className="loading">Загрузка...</div>;

    return (
      <div className="categories">
        {categories.map((el) => (
          <div
            key={el.key}
            onClick={() => this.handleCategoryClick(el.key)}
            className={`category-item ${activeCategory === el.key ? 'active' : ''}`}
          >
            {el.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
