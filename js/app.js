import {renderHeader, renderFooter} from "./components.js";

document.addEventListener('DOMContentLoaded', ()=>{
    renderHeader();
    renderFooter();

    console.log("Header y Footer inyectados.");
});