// IMPORTING LIT ELEMENTS
import { LitElement, css, html } from 'lit'
class Myelement extends LitElement  {
    constructor(){
        super();
        this.shuffleButton = "/public/shuffleButton.svg";
    }
    static styles =css`
    .wrapper{
        display:grid;
        grid-template-columns:1fr 4fr;
        background-color: var(--clr-main);
    }

    aside{
        padding:2rem;
        color:var(--clr-white);
        position:sticky;
        top:0;
        height: 100vh;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
    }
    
    .logo{
        font-weight:400;
        font-size:1.3rem;
    }

    .footer__text{
        color:var(--clr-main-light);
        font-size:.85rem;
    }
    
    main{
        background-color:var(--clr-white);
        margin:1rem;
        margin-left:0;
        border-radius:2rem;
        padding:3rem;
    }

    .principal__Title{
        color:var(--clr-main);
        margin-bottom: 2rem;
    }

    .product__container{
        display:grid;
        grid-template-columns:repeat(4, 1fr);
        gap:1rem;
    }

    .product__Image{
        max-width:100%;
        border-radius:1rem;
    }
    `
    render(){
        return html`
        <div class="wrapper">
            <aside>
                <header>
                    <h1 class= "logo">CampusShop</h1>
                </header>
                <nav>
                    <ul>
                        <li><button class="button__Category">All Products</button></li>
                        <li><button class="button__Category"> Coats</button></li>
                        <li><button class="button__Category">Shirts</button></li>
                        <li><button class="button__Category">Pants</button></li>
                        <li><a class = "cart__Button"><box-icon type='solid' name='cart'></box-icon>Cart <span class="number">0</span></a></li>
                    </ul>
                </nav>
                <footer>
                    <p class="footer__text">© 2024 CampusShop</p>
                </footer>
            </aside>
            
            <main>
                <h2 class="principal__Title">Todos los productos</h2>
                <div class="product__container">
                    <div class="products">
                        
                        <img class="product__Image" src="./public/abrigo1.webp" alt="">
                        <div class="product__Details">
                            
                            <h3 class="product__Title">Abrigo 1</h3>
                            
                            <p class="product__Price">$1000</p>
                            <button class="add__product">Agregar</button>
                        
                        </div>
                        <div class="products">
                        
                        <img class="product__Image" src="./public/abrigo1.webp" alt="">
                        <div class="product__Details">
                            
                            <h3 class="product__Title">Abrigo 2</h3>
                            
                            <p class="product__Price">$1000</p>
                            
                            <button class="add__product">Agregar</button>
                        
                        </div>
                        <div class="products">
                        
                        <img class="product__Image" src="./public/abrigo1.webp" alt="">
                        <div class="product__Details">
                            
                            <h3 class="product__Title">Abrigo 3</h3>
                            
                            <p class="product__Price">$1000</p>
                            
                            <button class="add__product">Agregar</button>
                        
                        </div>
                        <div class="products">
                        
                        <img class="product__Image" src="./public/abrigo1.webp" alt="">
                        <div class="product__Details">
                            
                            <h3 class="product__Title">Abrigo 4</h3>
                            
                            <p class="product__Price">$1000</p>
                            
                            <button class="add__product">Agregar</button>
                        
                        </div>
                    </div> 
                </div>
            </main>
        </div>
    `
    } 
}
customElements.define('my-element', Myelement)