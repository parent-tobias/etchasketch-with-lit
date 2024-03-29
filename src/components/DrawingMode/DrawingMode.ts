import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('drawing-mode')
export class DrawingMode extends LitElement {
	static style = css`
	:host {
	  box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	button {
		background-color: var(--mode-background, #eee);
		border-radius: 0;
		border: none;
		outline: none;
		width: 100%;
	}
	`;
  @property()
	title='Default';
	@property()
	handler=(cell:HTMLElement)=>cell.style.backgroundColor='#333';

	handleClick = (evt:Event)=>{
		this.dispatchEvent(new CustomEvent('mode-change', {
			detail:{title:this.title, handler: this.handler},
			bubbles: true,
			composed: true,
		}));
	}

	render(){
		return html`
<button @click="${this.handleClick}" class='drawing-mode-control'>${this.title}</button>
		`;
	}
}