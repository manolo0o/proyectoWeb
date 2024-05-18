// IMPORTING LIT ELEMENTS
import { LitElement, css, html } from 'lit'
class Myelement extends LitElement  {
    constructor(){
        super();
        this.view = 'products'; 
        this.cartItems = [];
        this.activeCategory = 'all';
    }
    static styles =css`
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 4fr;
        background-color: var(--clr-main);
    }
    
    aside {
        padding: 2rem;
        padding-right:0;
        color: var(--clr-white);
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .logo {
        font-weight: 400;
        font-size: 1.3rem;
    }
    .button__Category, .cart__Button {
        background-color:transparent;
        border:0;
        color:var(--clr-white);
        font-size:1rem;
        cursor:pointer;
        gap:1rem;
        font-weight:600;
        padding:1rem;
    }

    .button__Category.active{
        background-color:var(--clr-white);
        color:var(--clr-main    );
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

    .cart__Button{
        margin-top:3rem;
    }

    .menue{
        list-style:none;
        display:flex;
        flex-direction:column;
        gap:2rem;
    }
    
    .footer__text {
        color: var(--clr-main-light);
        font-size: .85rem;
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
        background-color: grey;
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
        font-size: 1.1rem;
        margin-bottom: .5rem;
    }
    
    .product__Price {
        color: var(--clr-main);
        font-weight: bold;
        margin-bottom: 1rem;
    }
    
    .add__product {
        background-color: var(--clr-main);
        color: var(--clr-white);
        border: none;
        padding: .5rem 1rem;
        border-radius: .5rem;
        cursor: pointer;
        transition: background-color .3s;
    }
    
    .add__product:hover {
        background-color: var(--clr-main-dark);
    }
    `;
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
                            <li><button class="button__Category ${this.activeCategory === 'coats' ? 'active' : ''}" @click=${() => this.changeCategory('coats')}>Coats</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'shirts' ? 'active' : ''}" @click=${() => this.changeCategory('shirts')}>Shirts</button></li>
                            <li><button class="button__Category ${this.activeCategory === 'pants' ? 'active' : ''}" @click=${() => this.changeCategory('pants')}>Pants</button></li>
                            <li><a class="cart__Button" @click=${() => this.view = 'cart'}><box-icon type='solid' name='cart'></box-icon>Cart <span class="number">${this.cartItems.length}</span></a></li>
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
                <ul>
                    ${this.cartItems.map(item => html`
                        <li>${item.title} - $${item.price}</li>
                    `)}
                </ul>
            ` : html`<p>El carrito está vacío</p>`}
        `;
    }

    addToCart(product) {
        this.cartItems = [...this.cartItems, product];
        this.requestUpdate();
    }

    get products() {
        return [
            // ABRIGOS
            { title: 'Abrigo 1', price: 1000, image: './public/abrigo1.webp', category: 'coats' },
            { title: 'Abrigo 2', price: 900, image: './public/abrigo2.webp', category: 'coats' },
            { title: 'Abrigo 3', price: 1000, image: './public/abrigo3.webp', category: 'coats' },
            { title: 'Abrigo 4', price: 1000, image: './public/abrigo4.webp', category: 'coats' },
            { title: 'Abrigo 5', price: 1000, image: './public/abrigo5.webp', category: 'coats' },
            // CAMISAS
            { title: 'Camisa 1', price: 1000, image: './public/camisa1.webp', category: 'shirts' },
            { title: 'Camisa 2', price: 1000, image: './public/camisa2.webp', category: 'shirts' },
            { title: 'Camisa 3', price: 1000, image: './public/camisa3.webp', category: 'shirts' },
            { title: 'Camisa 4', price: 1000, image: './public/camisa4.webp', category: 'shirts' },
            { title: 'Camisa 5', price: 1000, image: './public/camisa5.webp', category: 'shirts' },
            // PANTALONES
            { title: 'Pantalon 1', price: 1000, image: './public/pantalon1.webp', category: 'pants' },
            { title: 'Pantalon 2', price: 1000, image: './public/pantalon2.webp', category: 'pants' },
            { title: 'Pantalon 3', price: 1000, image: './public/pantalon3.webp', category: 'pants' },
            { title: 'Pantalon 4', price: 1000, image: './public/pantalon4.webp', category: 'pants' },
            { title: 'Pantalon 5', price: 1000, image: './public/pantalon5.webp', category: 'pants' }
        ];
    }
}

customElements.define('my-element', Myelement);