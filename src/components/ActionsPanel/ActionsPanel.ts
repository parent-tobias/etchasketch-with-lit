import {LitElement, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import { html, literal, unsafeStatic } from 'lit/static-html.js';

@customElement('actions-panel')
export class ActionsPanel extends LitElement {
	static styles=css`
	:host {
		width: 10rem;
		height: 90vh;
		border: 1px solid silver;
	}
	drawing-mode, color-picker-drawing-mode {
		width: 100%;
		border: 0;
		outline: none;
		margin: .25em .5em;

	}
	.additional-controls {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
	}
	`;

	@query('input[type="range"]')
	input!: HTMLInputElement;

	@query('input[type="checkbox"]')
	borderCheckBox!:HTMLInputElement;

	@property({type: Number})
	size=16;

  @property({type: Array})
	modes=[{type: 'drawing-mode', title: 'Default', handler: (cell:HTMLElement)=>cell.style.backgroundColor='#333'}]

	handleSizeChange(){
		this.dispatchEvent(new CustomEvent('size-change', {
			detail: {size: this.input.value},
			bubbles: true,
			composed: true
		}))
	}

	handleBordersChange(){
		this.dispatchEvent(new CustomEvent('borders-change', {
			detail: {borders: this.borderCheckBox.checked},
			bubbles: true,
			composed: true,
		}))
	}

	render(){
		return html`
	<div class='additional-controls'>
${this.modes?.map(({type, title, handler})=>{
	const tag = literal`${unsafeStatic(type)}`;
	return html`<${tag} title="${title}" .handler=${handler}></${tag}>`}) }
	<hr />
		<label><input type='checkbox' name='show-borders' @change='${this.handleBordersChange}' checked/> Show grid</label>
  <label for="grid-size">Grid size: <input @input="${this.handleSizeChange}" type="range" name="grid-size" min="10" max="100" value="${this.size}"/></label>
</div>
		`;
	}
}