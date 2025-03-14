import React from "react";
import Header from "../componets/Header";
import Footer from "../componets/Footer";
import Items from "../componets/Items";
import Categories from "../componets/Categories";
import ShowFullItem from "../componets/ShowFullItem";





class App extends React.Component  
{
  constructor(props){
    super(props)
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id:1,
          title: 'Стул серый',
          img:'grey_chair.jpg',
          decs:'Lorem ipsim dolor sit amet, consectetur adipisicing.',
          category:'chairs',
          price:'6.999'
        },
        {
          id:2,
          title:'Кухонный стол',
          img:'table.jpg',
          decs:'Lorem ipsim dolor sit amet, consectetur adipisicing.',
          category:'tables',
          price:'9.990'
        },
        {
          id:3,
          title:'Диван',
          img:'sofa.jpg',
          decs:'Lorem ipsim dolor sit amet, consectetur adipisicing.',
          category:'sofa',
          price:'69.999'
        },
        {
          id:4,
          title:'Торшер',
          img:'ligthas.jpg',
          decs:'Lorem ipsim dolor sit amet, consectetur adipisicing.',
          category:'lights',
          price:'2.999'
        },
        {
          id:5,
          title:'Стул белый',
          img:'white_chair.jpg',
          decs:'Lorem ipsim dolor sit amet, consectetur adipisicing.',
          category:'chairs',
          price:'5.999'
        },
        {
          id:6,
          title:'Кресло',
          img:'chair.jpg',
          decs:'Lorem ipsim dolor sit amet, consectetur adipisicing.',
          category:'chairs',
          price:'8.999'
        },
      ],
      showFullItem: false,
      fullItem: {}
    }
    this.state.currentItems = this.state.items
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategories = this.chooseCategories.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
  }


  render()
  {
    return (
      <div className="wrapper"> 
      

      <Header orders={this.state.orders} onDelete={this.deleteOrder}/>
      <div className='presentation'></div>
      <Categories chooseCategories ={this.chooseCategories}/>
      <Items onShowItem={this.onShowItem} items={this.state.currentItems} onAdd={this.addToOrder}/>
  
      {this.state.showFullItem && <ShowFullItem item={this.state.fullItem} onAdd={this.addToOrder} onShowItem={this.onShowItem}/>}
      <Footer/>

      </div>
    )
  }     
  

  onShowItem(item){
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }


  chooseCategories(category){
    if(category === 'all'){
      this.setState({currentItems: this.state.items})
      return
    }
    this.setState({
      currentItems: this.state.items.filter(el => el.category === category)
    })
  }



  deleteOrder(id) {
    
    this.setState({orders : this.state.orders.filter(el => el.id !== id)})

  }


  addToOrder(item){
    let isInArray
    this.state.orders.forEach(el => {
      if(el.id === item.id)
        isInArray = true
    })

    if (!isInArray)
    this.setState({orders: [...this.state.orders, item]})
  }

  }

export default App;