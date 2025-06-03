import React, { Component } from 'react'
import { FaTrash } from 'react-icons/fa'

export class Order extends Component {
  render() {
    return (

      <div className='item'>
        <img
          src={`http://localhost:8000/img/products/${this.props.item.image}`}
          alt=''
          onClick={() => this.props.onShowItem(this.props.item)}
        />
        <h2>{this.props.item.name}</h2>
        <p>{this.props.item.description}</p>
        <b>{this.props.item.price}</b>   
        <FaTrash className='delete-icon' onClick={() => this.props.onDelete(this.props.item.id)}/>
     </div>
    )
  }
}

export default Order