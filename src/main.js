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
        font-weight: 400;
        font-size: 1.3rem;
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
        padding: .7rem;
        display: block; /* Asegurarse de que el botón tome todo el ancho disponible */
        width: 100%;
    }
    
    .cart__Button.active {
        background-color: var(--clr-white);
        color: var(--clr-main);
        width: 100%;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        position: relative;
    }
    .cart__Container{
        display:flex;
        flex-direction:column;
    }
    .container__ProductCart{
        width: 100%;
        height: 20%;
        border: 1px solid black;
        border-radius: 1rem;
        display: flex;
        justify-content: space-around;
    }

    .cart__Image{
        width:10%;
        border-radius:1rem;
        border: 1px solid black ;
    }
    
    

    .menue{
        list-style:none;
        display:flex;
        flex-direction:column;
        gap:1rem;
    }
    
    .footer__text {
        color: var(--clr-main-light);
        font-size: .85rem;
        text-align:center;
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
        background-color: var(--clr-main-dark);
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
                                    
                                    Cart <span class="number">${this.cartItems.length}</span>
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

    viewCart() {
        this.activeCategory = null;
        this.view = 'cart';
        this.requestUpdate();
    }

    changeCategory(category) {
        this.activeCategory = category;
        this.view = 'products';
        this.requestUpdate();
    }

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

    renderCart() {
        return html`
            <h2 class="principal__Title">Carrito de Compras</h2>
                ${this.cartItems.length > 0 ? html`
                <div class="cart__Container"> 
                    <div class="container__ProductCart"> 
                            ${this.cartItems.map(item => html`
                                <img class="cart__Image" src="${item.image}" alt="">
                                <p>Product <br> ${item.title}</p>
                                <p>Amount <br> ${item.price}</p>
                                <p>Price <br> ${item.price}</p>
                                <p>Delete</p>
                            `)}
                    </div>
                </div>
            ` : html`<p>Tu carrito está vacío :( </p>`}
        `;
    }

    addToCart(product) {
        this.cartItems = [...this.cartItems, product];
        this.requestUpdate();
    }

}

customElements.define('my-element', Myelement);

/* <box-icon type='solid' name='cart'></box-icon> */