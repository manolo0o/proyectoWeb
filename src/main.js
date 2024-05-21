// IMPORTING LIT ELEMENTS THAT WE ARE GONNA USE ON THE PROJECT
import { LitElement, css, html } from 'lit'
//_______________________________________________________________________________________________________________________________________
// Propperties
class Myelement extends LitElement  {
    static get properties() { // Define the reactivity of the components
        return {
            activeCategory: { type: String }, //This proppertie load the categories, when we change his value, they start to render the product from the category that was selected.
            view: { type: String }, // This one is for change the views when u click on the menu.
            cartItems: { type: Array }, // This is an arrray that contain the elements we choose in the store and then reflects them on the cart.
            products: { type: Array }, // This one its an array too, the difference is that this one contain all the products that we hace from a json or font of data.
            menuOpen: { type: Boolean }
        };
    }

//_______________________________________________________________________________________________________________________________________
// Function to add all the methods that we gonna use.
    constructor() { // this starts the instances from the componentn LitElmnt
        super(); // Calls the constructor from the initial class, its necessary for security of the executions.
        this.activeCategory = 'all'; // This define that the start category that the client its gonna see at first is all the products.
        this.view = 'products'; // This the define the view like products.
        this.cartItems = []; // Starts as an empty array, and then, load the products that wheee choose on the cart view
        this.products = []; // Its like the one above, just with all the products that we have in the json files.
        this.loadProducts(); // Call the method loadProducts for load all the items from the json file an then, reflect it on the proppertie 'products'
        this.menuOpen = false;  // Initialize menuOpen to false
        this.loadProducts();
    }
    connectedCallback() { // we call this method when we need to conect the DOM (Document Object Model).
        super.connectedCallback(); 
        this.loadProducts();
    }

//_______________________________________________________________________________________________________________________________________   
// Function to search or consume all the producs or files that we gonna use.
    async loadProducts() {
        try {
            const response = await fetch('./src/products.json'); // this fetch is for search the products in the json.
            const data = await response.json();
            this.products = data.map(item => ({
                // In this part am maping the item for a correct assigment on the function render()
                id: item.id,
                title: item.titulo,
                image: item.imagen,
                category: item.categoria.id,
                price: item.precio
            }));
            this.requestUpdate();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

//_______________________________________________________________________________________________________________________________________   
//Styling CSS (Visual Section)//
    static styles =css`
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr;
        background-color: var(--clr-main);
    }
    
    aside {
        padding: 1rem;
        padding-right:0;
        color: var(--clr-white);
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    
    .logo {
        font-weight: 800;
        font-size: 2rem;
        text-align:center;
    }
    .button__Category{
        background-color:transparent;
        border:0;
        color:var(--clr-white);
        font-size:1rem;
        cursor:pointer;
        gap:1rem;
        font-weight:600;
        padding:1rem;
        width:100%;
        text-align:center;
    }
    .button__Category:hover{
        background-color:var(--clr-white);
        color:var(--clr-main);
        width:100%;
        border-top-left-radius:1rem;
        border-bottom-left-radius:1rem;
        position:relative;
    }

    .button__Category.active{
        background-color:var(--clr-white);
        color:var(--clr-main);
        width:100%;
        border-top-left-radius:1rem;
        border-bottom-left-radius:1rem;
        position:relative;
    }
    .button__Category.active::before{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        bottom:100%;    
        right:0;
        background-color:transparent;
        border-bottom-right-radius:.7rem;
        box-shadow:0 1rem 0 var(--clr-white);
    }

    .button__Category.active::after{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        top:100%;
        right:0;
        background-color:transparent;
        border-top-right-radius:.7rem;
        box-shadow:0 -1rem 0 var(--clr-white);
    }

    .cart__Button {
        text-align:center;
        background-color: transparent;
        border: 0;
        color: var(--clr-white);
        font-size: 1rem;
        cursor: pointer;
        gap: 1rem;
        font-weight: 600;
        padding: 1rem;
        display: block; 

    }
    .cart__Button.active {
        background-color: var(--clr-white);
        color: var(--clr-main);
        width: 90%;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        position: relative;
    }
    .cart__Button.active::before{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        bottom:100%;    
        right:0;
        background-color:transparent;
        border-bottom-right-radius:.7rem;
        box-shadow:0 1rem 0 var(--clr-white);
    }

    .cart__Button.active::after{
        content:'';
        position:absolute;
        width:1rem;
        height:2rem;
        top:100%;
        right:0;
        background-color:transparent;
        border-top-right-radius:.7rem;
        box-shadow:0 -1rem 0 var(--clr-white);
    }
    .cart__Button.active .number{
        background-color:var(--clr-main);
        color:var(--clr-white);
    }
    

    .cart__Button:hover {
        background-color:var(--clr-white);
        color:var(--clr-main);
        border-top-left-radius:1rem;
        border-bottom-left-radius:1rem;
        position:relative;
    }

    .number{
        background-color:var(--clr-white);
        color:var(--clr-main);
        padding:0 .25rem;
        border-radius:.25rem;
        border:black 1.5px solid;
    }

    .menue{
        list-style:none;
        display:flex;
        flex-direction:column;
        gap:1rem;
    }

    
    .footer__text{
        font-size: .85rem;
        text-align:center;
        color:var(--clr-main-light);
    }
    
    main {
        background-color: var(--clr-white);
        margin: 1rem;
        margin-left: 0;
        border-radius: 2rem;
        padding: 3rem;
    }
    
    .principal__Title {
        color: var(--clr-main);
        margin-bottom: 2rem;
    }
    
    .product__container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem; 
    }
    
    .products {
        background-color: black ;
        padding: 1rem;
        border-radius: 1rem;
        text-align: center;
    }
    .products:hover{
        transform: scale(1.05);
        transition: transform 0.3s ease-in-out;
    }
    
    .product__Image {
        max-width: 100%;
        border-radius: 1rem;
    }
    
    .product__Details {
        margin-top: 1rem;
    }
    
    .product__Title {
        color:var(--clr-white);
        font-size: 1.1rem;
        margin-bottom: .5rem;
    }
    
    .product__Price {
        color: var(--clr-white);
        font-weight: bold;
        margin-bottom: 1rem;
    }
    
    .add__product {
        background-color: transparent;
        color: var(--clr-white);
        font-weight:600;
        padding: .5rem 1rem;
        border-radius: .7rem;
        cursor: pointer;
        transition: background-color .3s;
        border: 2px solid var(--clr-white);
    }
    
    .add__product:hover {
        background-color: var(--clr-white);
        color:var(--clr-main);
    }

    /*_______________________________________________________________________________________________________________________________________*/  
    /*CART CSS*/    
    
    
    .container__ProductCart{
        display:flex;
        flex-direction:column;
        gap:1rem;
    }
    
    .product__Cart{
        display:flex;
        justify-content:space-between;
        align-items:center;
        background-color:black;
        color:white;
        padding:.5rem;
        padding-right:1.5rem;
        border-radius:1rem;
    }
    
    .cart__Image{
        width: 7rem;
        border-radius: 1rem;
    }
    
    .product__Cart small{
        font-size: .75rem;
    }
    
    .cart__Delete{
        border:0;
        background-color:transparent;
        cursor:pointer;
    }
    
    .cart__Container{
        display:flex;
        flex-direction:column;
        gap:1.5rem;
    }
    
    .cart__Actions{
        display:flex;
        justify-content:space-between;
        margin-top:1rem;
    }
    
    .cart__Actions_Delete{
        border:0;
        background-color:gray;
        padding:0.7rem;
        border-radius:1rem;
        color:var(--clr-white);
        text-transform:upperCase;
        cursor:pointer;
    }
    
    .cart__Actions_Delete:hover{
        background-color:var(--crl-white);
        color:gray;
        border:2px solid gray;
        
    }

    .cart__Actions_Right{
        display:flex;
    }

    .cart__Actions_Total{
        display:flex;
        background-color:gray;
        border-top-left-radius:0.7rem;
        border-bottom-left-radius:0.7rem;
        color:var(--clr-white);
        text-transform:upperCase;
        padding:0.2rem;
        gap:1rem;
    }

    .cart__Actions_Buy{
        border:0;
        background-color:black;
        padding:1rem;
        color:var(--clr-white);
        text-transform:upperCase;
        cursor:pointer;
        border-top-right-radius:0.7rem;
        border-bottom-right-radius:0.7rem;
        
    }
    .cart__Actions_Buy:hover{
        background-color:var(--clr-white);
        color:gray;
        border:2px solid gray;        
    } 

    .kitty{
        display:flex;
        align-items:center;
    }
    .kitty p{
        margin-right:.3rem;
        font-size:1.1rem;
    }
    .header__Mobile{
        display:none;
    }
    .close__menue{
        display:none;
    }
    /*_______________________________________________________________________________________________________________________________________*/  
    /* MEDIAQUIERIE*/
    @media screen and (max-width: 700px){
        .wrapper{
            min-height:100vh;
            display:flex;
            flex-direction:column;
        }
        .logo{
            font-size:1.5rem;
            margin-bottom:0;
        }
        aside{
            position:fixed;
            z-index:9;
            background-color:var(--clr-main);
            left:0; /* Ajustado para que el aside ocupe todo el ancho */
            box-shadow:0 0 0 100vmax rgba(0, 0, 0, .75);
            transform:translateX(-100%);
            opacity:0;
            visibility:hidden;
            transition:.2s;
            width:50%; /* Asegura que el aside ocupe todo el ancho */
            display:flex;
            flex-direction:column;
        }
        .aside-visible{
            transform:translateX(0%);
            opacity:1;
            visibility:visible;
        }
        main{
            margin:1rem;
            padding:1.5rem;
        }
        .product__container{
            grid-template-columns:1fr;
        }
        .button__Category.active::before,
        .button__Category.active::after,
        .cart__Button.active::before,
        .cart__Button.active::after{
            display:none
        }
        .cart__Button.active{
            width:84%; /* Asegura que el botón ocupe todo el ancho */
        }
        .cart__Button:hover{
            width:84%;
        }
        .header__Mobile{
            display:flex;
            padding:1rem;
            justify-content:space-between;
            align-items:center;
        }
        .header__Mobile .logo{
            color:var(--clr-white);
        }
        .menue{
            gap:2rem;
            padding:0;
            margin:0; /* Elimina el margen de la lista */
            width:100%; /* Asegura que la lista ocupe todo el ancho */
        }
        .open__menue,
        .close__menue{
            background-color:transparent;
            color:var(--clr-white);
            border:none;
            cursor:pointer;
        }
        .menu__svg{
            width:2.5rem;
        }
        .close__menue{
            display:block;
            height:0;
        }
        .header__menue{
            display:flex;
            width:100%;
            justify-content: space-between;
            align-items: center;
        }
        ul{
            margin:0;
            padding:0; /* Elimina el padding de la lista */
            width:100%; /* Asegura que la lista ocupe todo el ancho */
        }
        nav{
            width:100%; /* Asegura que el nav ocupe todo el ancho */
        }
        .menue {
            list-style:none;
            padding:0; /* Elimina el padding de la lista */
            margin:0; /* Elimina el margen de la lista */
            width:100%; /* Asegura que la lista ocupe todo el ancho */
        }
        .button__Category{
            width:100%; /* Asegura que los botones ocupen todo el ancho */
        }
        .cart__Button{
            width:84%; /* Asegura que los botones ocupen todo el ancho */
        }

        .cart__Image{
            width: 40%; /* Asegura que el botón ocupe todo el ancho */
            margin-bottom:1rem;
        }
        .product__Cart{
            padding: 1.5rem;
            flex-wrap: wrap;
        }
        .principal__Title {
            margin-bottom: 1.5rem;
        }
        .cart__Actions_Right {
            display: flex;
            width: 64%;
            margin-left: 1rem;
        }
        .cart__Actions_Delete {
            padding:.9rem;
        }
        .content__Product{
            font-size: 0.9rem;
            margin-right: 0.5rem;
            width: 46%;
        }

        .cart__Amount,
        .cart__Price,
        .cart__Subtotal{
            font-size:.8rem;
            margin-right: .5rem;
        }
   
        .cart__Delete img{
            width:1.5rem;
        }
    }
    `; 

//_______________________________________________________________________________________________________________________________________   
// Principal Html //
    render() {
        return html`
            <div class="wrapper">
            <header class="header__Mobile">
                <h1 class="logo">CampusShop</h1>
                <button class="open__menue" @click="${this.openMenu}">
                    <img class="menu__svg" src="./public/menu.svg" alt="">
                </button>
            </header>
            <aside class="${this.menuOpen ? 'aside-visible' : ''}">
                <header class="header__menue">
                    <h1 class="logo">CampusShop</h1>
                    <button class="close__menue" @click="${this.closeMenu}">
                        <img class="closeMenu__svg" src="./public/closeMenu__svg.svg" alt="">
                    </button>
                </header>
                    <nav>
                        <ul class="menue">
                            <li><button class="button__Category ${this.activeCategory === 'all' ? 'active' : ''}" @click=${() => this.changeCategory('all')}>All Products</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'abrigos' ? 'active' : ''}" @click=${() => this.changeCategory('abrigos')}>Coats</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'camisas' ? 'active' : ''}" @click=${() => this.changeCategory('camisas')}>Shirts</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'pantalones' ? 'active' : ''}" @click=${() => this.changeCategory('pantalones')}>Pants</button></li>
                            <li style="width: 100%;">
                                <a class="cart__Button ${this.view === 'cart' ? 'active' : ''}" @click=${this.viewCart}>
                                    Cart
                                    <span class="number">${this.cartItems.length}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <footer>
                        <p class="footer__text">© 2024 CampusShop</p>
                    </footer>
                </aside>
                <main>
                    ${this.view === 'products' ? this.renderProducts() : this.renderCart()}
                </main>
            </div>
        `;
    }

//_______________________________________________________________________________________________________________________________________   
// Change the view show the cart view //
    viewCart() {
        this.activeCategory = null;
        this.view = 'cart';
        this.menuOpen = false; // Close the menu when the cart is viewed
        this.requestUpdate();
    }

//_______________________________________________________________________________________________________________________________________   
// Change the cathegory and shows to the user the view of te products//
    changeCategory(category) {
        this.activeCategory = category;
        this.view = 'products';
        this.menuOpen = false; // Close the menu when a category is selected
        this.requestUpdate();
    }

//_______________________________________________________________________________________________________________________________________   
//Method to load all the products & respective HTML //
    renderProducts() {
        const filteredProducts = this.products.filter(product => this.activeCategory === 'all' || product.category === this.activeCategory);
        return html`
            <h2 class="principal__Title">${this.activeCategory === 'all' ? 'Todos los productos' : this.activeCategory.charAt(0).toUpperCase() + this.activeCategory.slice(1)}</h2>
            <div class="product__container">
                ${filteredProducts.map(product => html`
                    <div class="products">
                        <img class="product__Image" src=${product.image} alt="">
                        <div class="product__Details">
                            <h3 class="product__Title">${product.title}</h3>
                            <p class="product__Price">$${product.price}</p>
                            <button class="add__product" @click=${() => this.addToCart(product)}>Agregar</button>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

//_______________________________________________________________________________________________________________________________________   
// Method to load the selected products on the Cart & respective HTML //
renderCart() {
    const total = this.cartItems.reduce((acc, item) => acc + item.subtotal, 0);

    return html`
        <h2 class="principal__Title">Carrito de Compras</h2>
        ${this.cartItems.length > 0 ? html`
            <div class="cart__Container"> 
                ${this.cartItems.map(item => html`
                <div class="product__Cart"> 
                    <img class="cart__Image" src="${item.image}" alt="">
                    <div class="content__Product">
                        <small>Product</small>    
                        <h3>${item.title}</h3>
                    </div>
                    <div class="cart__Amount">
                        <small>Amount</small>
                        <p>${item.quantity}</p>
                    </div>
                    <div class="cart__Price">
                        <small>Price</small>
                        <p>$${item.price}</p>
                    </div>
                    <div class="cart__Subtotal">
                        <small>Subtotal</small>
                        <p>$${item.subtotal}</p>
                    </div>
                    <button class="cart__Delete" @click=${() => this.removeFromCart(item.id)}>
                        <img src="./public/icon.svg" alt="">
                    </button>
                </div>
                `)}
            </div>
            <div class="cart__Actions">
                <div class="cart__Actions_Left">
                    <button class="cart__Actions_Delete" @click=${this.emptyCart}>Vaciar Carrito</button>
                </div>
                <div class="cart__Actions_Right">
                    <div class="cart__Actions_Total">
                        <p>Total:</p>
                        <p>$${total}</p>
                    </div>
                    <button class="cart__Actions_Buy" @click=${() => this.alert(Swal)}>Buy now!</button>
                </div>
            </div>
        ` : html`<div class="kitty"><p>Tu carrito está vacío. . .</p><img class="Cat"src="./public/Cat.svg" alt=""></div>`}
    `;
}

//_______________________________________________________________________________________________________________________________________   
// Function to remove an item from the cart //
removeFromCart(productId) {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (this.cartItems[itemIndex].quantity > 1) {
            this.cartItems[itemIndex].quantity -= 1;
            this.cartItems[itemIndex].subtotal = this.cartItems[itemIndex].quantity * this.cartItems[itemIndex].price;
        } else {
            this.cartItems = this.cartItems.filter(item => item.id !== productId);
        }
    }
    this.requestUpdate();
}

//_______________________________________________________________________________________________________________________________________   
// Method to empty the cart//
emptyCart() {
    this.cartItems = [];
    this.requestUpdate();
}

//_______________________________________________________________________________________________________________________________________   
// Add a product and dont repeat them //
addToCart(product) {
    added()
    const cartItem = this.cartItems.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity += 1;
        cartItem.subtotal = cartItem.quantity * cartItem.price;
    } else {
        this.cartItems = [
            ...this.cartItems,
            { ...product, quantity: 1, subtotal: product.price }
        ];
    }
    this.requestUpdate();
}

//_______________________________________________________________________________________________________________________________________   

openMenu() {
    this.menuOpen = true;
    this.requestUpdate();
}

//_______________________________________________________________________________________________________________________________________   

closeMenu() {
    this.menuOpen = false;
    this.requestUpdate();
}


//_______________________________________________________________________________________________________________________________________   
}
// defining the label //
customElements.define('my-element', Myelement);

//_______________________________________________________________________________________________________________________________________   
//mergent window//

const added = async () => { 
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Succesfully Added :D"
      });
}