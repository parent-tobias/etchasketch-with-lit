import {LitElement, html, css} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';

@customElement('color-picker-drawing-mode')
export class ColorPickerDrawingMode extends LitElement {
	static style = css`
	:host {
	  box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	input {
		background-color: var(--mode-background, #eee);
		border-radius: 0;
		border: none;
		outline: none;
		width: 100%;
	}
	`;
  @property()
	title='Default';

	@state()
	customColor='#333';
	@query('input[type="color"]')
	input!: HTMLInputElement;


	handleChange = (evt:Event)=>{
		this.customColor=this.input.value;
		this.dispatchEvent(new CustomEvent('mode-change', {
			detail:{title:this.title, handler: (cell:HTMLElement)=>cell.style.backgroundColor=this.customColor},
			bubbles: true,
			composed: true,
		}));
	}

	render(){
		return html`
<label><input type='color' @change="${this.handleChange}" class='drawing-mode-control'>${this.title}</label>
		`;
	}
}