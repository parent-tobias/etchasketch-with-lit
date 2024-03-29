export { EtchGrid } from './components/EtchGrid/EtchGrid';
export { DrawingMode } from './components/DrawingMode/DrawingMode';
export {ActionsPanel} from './components/ActionsPanel/ActionsPanel';


// Dynamically add coloring handlers to the actions panel, creating the mode buttons.
const handlers = [
	{title: 'Default', handler: (cell)=>cell.style.backgroundColor="#bbb"},
	{title: 'Black', handler: (cell)=>cell.style.backgroundColor='#333'},
	{title: 'Random', handler: (cell)=>cell.style.backgroundColor=`#${Math.floor(Math.random()*16777215).toString(16)}`}
]
document.querySelector('actions-panel').modes = handlers;

// setup the default so *something* happens.
document.querySelector("etch-grid").onMouseover = handlers[0].handler;


// listen for changes to both drawing mode buttons, and size change.
// When either happens, tell the etch-grid about it and let it handle it itself.
document.querySelector('actions-panel').addEventListener("mode-change", (evt)=>
  document.querySelector('etch-grid').onMouseover=evt.detail.handler
)
document.querySelector('actions-panel').addEventListener("size-change", (evt)=>
  document.querySelector('etch-grid').size=evt.detail.size
)