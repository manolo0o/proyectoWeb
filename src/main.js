// IMPORTING LIT ELEMENTS
import { LitElement, css, html } from 'lit'
class Myelement extends LitElement  {
    constructor(){
        super();
        this.shuffleButton = "/public/shuffleButton.svg";
    }
    static styles =css`
    `
// HTML STRUCTURE
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
            </aside>
            
            <main>
                
            </main>
        </div>
    `
    } 
}
customElements.define('my-element', Myelement)