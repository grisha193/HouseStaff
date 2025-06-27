import React, { Component } from 'react'
import Item from './Item'


export class Items extends Component {
  
  render() {
    
    const isAll = this.props.chooseCategories === 'all';
    const containerClass = isAll ? 'items-container default' : 'items-container compact';
    return (
    <main className={containerClass}>
        {this.props.items.map((el) => (
          <Item
            onShowItem={this.props.onShowItem}
            key={el.id}
            item={el}
            onAdd={this.props.onAdd}
          />
        ))}
      </main>
    )
  }
}

export default Items