// IMPORTING LIT ELEMENTS
import { LitElement, css, html } from 'lit'
class Myelement extends LitElement  {
    static get properties() {
        return {
            activeCategory: { type: String },
            view: { type: String },
            cartItems: { type: Array },
            products: { type: Array }
        };
    }
//_______________________________________________________________________________________________________________________________________   
// Function to add all the methods that we gonna use.
    constructor() {
        super();
        this.activeCategory = 'all';
        this.view = 'products';
        this.cartItems = [];
        this.products = [];
        this.loadProducts();
    }
    connectedCallback() {
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
//Styling CSS (Visual Section)
    
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
        border-radius: .8rem;
        cursor: pointer;
        transition: background-color .3s;
        border: 1.5px solid var(--clr-white);
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
        width:4rem;
        border-radius:1rem;
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
        padding:1rem;
        border-radius:1rem;
        color:var(--clr-white);
        text-transform:upperCase;
        cursor:pointer;
    }

    .cart__Actions_Right{
        display:flex;
        
    }

    .cart__Actions_Total{
        display:flex;
        background-color:gray;
        border-top-left-radius:1rem;
        border-bottom-left-radius:1rem;
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
        border-top-right-radius:1rem;
        border-bottom-right-radius:1rem;
    }


    `;

//_______________________________________________________________________________________________________________________________________   
// Principal Html
    render() {
        return html`
            <div class="wrapper">
                <aside>
                    <header>
                        <h1 class="logo">CampusShop</h1>
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

    viewCart() {
        this.activeCategory = null;
        this.view = 'cart';
        this.requestUpdate();
    }
//_______________________________________________________________________________________________________________________________________   

    changeCategory(category) {
        this.activeCategory = category;
        this.view = 'products';
        this.requestUpdate();
    }
//_______________________________________________________________________________________________________________________________________   

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

renderCart() {
    const total = this.cartItems.reduce((acc, item) => acc + item.price, 0);

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
                        <p>1</p>
                    </div>
                    <div class="cart__Price">
                        <small>Price</small>
                        <p>${item.price}</p>
                    </div>
                    <div class="cart__Subtotal">
                        <small>Subtotal</small>
                        <p>${item.price}</p>
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
                    <button class="cart__Actions_Buy">Buy now!</button>
                </div>
            </div>
        ` : html`<p>Tu carrito está vacío :( </p>`}
    `;
}

removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.requestUpdate();
}

emptyCart() {
    this.cartItems = [];
    this.requestUpdate();
}

//_______________________________________________________________________________________________________________________________________   

    addToCart(product) {
        this.cartItems = [...this.cartItems, product];
        this.requestUpdate();
    }

}
//_______________________________________________________________________________________________________________________________________   
customElements.define('my-element', Myelement);
