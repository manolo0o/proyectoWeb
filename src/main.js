// IMPORTING LIT ELEMENTS//
import { LitElement, css, html } from 'lit'
class Myelement extends LitElement  {
    constructor(){
        super();
        this.shuffleButton = "/public/shuffleButton.svg";
    }
    static styles =css`

    `
    render(){
        return html`
         
    `
    } 
}
customElements.define('my-element', Myelement)