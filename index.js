import {menuArray} from "./data.js"

const backgroundModal = document.getElementById("background-modal")
const cardForm = document.getElementById('card-form')


cardForm.addEventListener("submit",function(e){
    e.preventDefault()
    
    const cardFormData = new FormData(cardForm)
    const name = cardFormData.get('name')
    const cardNumber = cardFormData.get('cardnumber')
    const cvv = cardFormData.get('cvv')
    
    const finalContainer = document.getElementById("final-container")
    
    finalContainer.innerHTML =`
        <div class="thanks-message">
            <h2>Thanks, ${name}! Your order is on its way!</h2>
        </div>
    `
    cardForm.reset()
    resetOrder()
    
    backgroundModal.style.display="none"
    
})


document.addEventListener("click",function(e){
    if(e.target.dataset.add){
        handleClickItem(e.target.dataset.add)
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    }else if(e.target.dataset.remove){
        handleClickRemove(e.target.dataset.remove)
    }else if(e.target.id === 'complete-order'){
        backgroundModal.style.display="block"
    }else if(e.target.id === 'modal-close-btn'){
        backgroundModal.style.display="none"
    }
})


function resetOrder(){
    const filterQuantity = menuArray.forEach(menu =>{
        if(menu.quantity > 0){
            menu.quantity = 0
        }
    })
    return filterQuantity
    render()
}

function handleClickItem(itemId){
 const filterItemClicked = menuArray.filter(menu=>{
     return menu.id === itemId
 })[0]
 
 filterItemClicked.quantity++

    render()
}

function handleClickRemove(itemId){
 const filterItemRemove = menuArray.filter(menu=>{
     return menu.id === itemId
 })[0]
 
 filterItemRemove.quantity--

    render()
}


function getMenuHtml(){
    
    let menuHtml = ''  
    

    menuArray.forEach(menu=>{
        
       
        menuHtml +=`
            <div class="item">
                <h3 class="emoji-item">${menu.emoji}</h3>
                <div class="info">
                    <h2 class="name-item">${menu.name}</h2>
                    <p class="ingredients-item">${menu.ingredients.join(", ")}</p>
                    <h4 class="price-item">$${menu.price}</h4>
                </div>
                <i class="fa-solid fa-circle-plus add-item" data-add="${menu.id}"></i>
            </div>  
        `      
    })
    
    return  menuHtml
}

function getOrderHtml(){
    
    let isHidden = 'hidden'
    let lineThrough =''
    let orderHtml = ''
    let total = 0
    let discount = 0
    let isDiscount = false
    let isFood = false
     
         menuArray.forEach(order=>{

         if(order.quantity>0){
             total +=order.price*order.quantity
             
             if(order.name !== 'Beer'){
                 isFood = true
                 lineThrough = ''
                 isDiscount=false
             } else if(isFood && order.name ==='Beer'){
                 isDiscount=true
                 discount=total*0.9
                 lineThrough = 'discount-line'
             }else{
                 isFood=false
                 isDiscount=false
                 lineThrough = ''
             }
             
            orderHtml +=`
                <div class="order-item">
                    <p class="order-name">${order.name}</h2>
                        <div class="quantity-container">
                            <i class="fa-solid fa-circle-minus icon-item-order" data-remove="${order.id}"></i>
                            <p class="order-quantity">${order.quantity}</p>
                            <i class="fa-solid fa-circle-plus icon-item-order" data-add="${order.id}"></i>
                        </div>
                    
                    <h4 class="order-price">$ ${order.price*order.quantity}</h4>
                </div>
            `          
         }
         
    })
    
    
    
     orderHtml +=`
                <div class="total-inner">
                    <h2 class="title-total ${lineThrough}">Total price:</h2>
                    <h3 class="price-total ${lineThrough}">$${total}</h3>
                </div>
        `      
    
    if(isDiscount){
        orderHtml +=`
                <div class="discount-inner">
                     <h2 class="title-total">Discount:</h2>
                    <h3 class="price-total">$${discount.toFixed(2)}</h3>
                </div>
        `
    }
    
    orderHtml +=`<button class="btn-complete" id="complete-order">Complete order</button>`
    
    if(total>0){
        isHidden=''
    }
    
    let containerOrderHtml = `<div id="final-container" class="${isHidden}">
            <h3 class="orderTitle">Your order</h3>
                ${orderHtml}
            </div>`
       return containerOrderHtml
}

function render(){
document.getElementById("menu-list").innerHTML = getMenuHtml()    
document.getElementById("order-list").innerHTML = getOrderHtml()    
}

render()