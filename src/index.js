export { EtchGrid } from './components/EtchGrid/EtchGrid';
export { DrawingMode } from './components/DrawingMode/DrawingMode';
export { ColorPickerDrawingMode } from './components/DrawingMode/ColorPickerDrawingMode';
export {ActionsPanel} from './components/ActionsPanel/ActionsPanel';
import { toHtml } from './util';


const actionsPanel = document.querySelector('actions-panel');
const etchGrid = document.querySelector('etch-grid');

// Dynamically add coloring handlers to the actions panel, creating the mode buttons.
const handlers = [
	{type: 'drawing-mode', title: 'Default', handler: (cell)=>cell.style.backgroundColor="hsl(0 0% 50%)"},
	{type: 'drawing-mode', title: 'Black', handler: (cell)=>cell.style.backgroundColor='hsl(0 0 100)'},
	{type: 'drawing-mode', title: 'Shader', handler: (cell, evt)=>{
		if(!cell.style.backgroundColor){
			cell.style.backgroundColor = "rgb(255 255 255)";
		}
		const currentBg = getComputedStyle(cell).getPropertyValue('background-color');
		if(evt.shiftKey){
	  	cell.style.backgroundColor = `rgb(from ${currentBg} calc(r*1.1) calc(g*1.1) calc(b*1.1))`;	
		} else {
	  	cell.style.backgroundColor = `rgb(from ${currentBg} calc(r*.9) calc(g*.9) calc(b*.9))`;	
		}
	}},
	{type: 'drawing-mode', title: 'Random', handler: (cell)=>cell.style.backgroundColor=`rgb(${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)} ${Math.floor(Math.random()*255)})`},
	{type: 'drawing-mode', title: 'Random Letter!', handler: (cell)=>cell.textContent = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'.charAt(Math.floor(Math.random()*72))},
	{type: 'color-picker-drawing-mode', title: 'Custom Color'},
	{type: 'drawing-mode', title: 'Reset', handler:()=>{} }
]

actionsPanel.modes = handlers;

// setup the default so *something* happens.
etchGrid.onMouseover = handlers[0].handler;


// listen for changes to both drawing mode buttons, and size change.
// When either happens, tell the etch-grid about it and let it handle it itself.
actionsPanel.addEventListener("mode-change", (evt)=>{
  const {title, handler} = evt.detail;
	if(title==='Reset'){
		etchGrid.dispatchEvent(new CustomEvent('reset-grid'));
	} else {
    etchGrid.onMouseover=evt.detail.handler;
	}
});
actionsPanel.addEventListener("size-change", (evt)=>
  etchGrid.size=evt.detail.size
);
actionsPanel.addEventListener("borders-change", (evt)=>
  etchGrid.borders=evt.detail.borders
);