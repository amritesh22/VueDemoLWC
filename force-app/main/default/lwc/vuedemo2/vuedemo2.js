import { LightningElement, track } from "lwc";
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import vuejs from '@salesforce/resourceUrl/vuejs';
import vueapp from './vueapp.js';

export default class Vuedemo2 extends LightningElement {
    
    vueApp; // Class property to hold the instance of the framework  
    titleValue = "Vue App"; // Class property to hold the (inital) title value
    _isRendered;

    _store; //pass values from lwc to vue app

    renderedCallback() {
        if (this._isRendered) return;
        this._isRendered = true;

        Promise.all([
            loadScript(this, vuejs)             
        ])
        .then(() => {
            console.log("All scripts and CSS are loaded. ");  
            const vue = window.Vue;            
            this.vueApp = vueapp(vue, this.template.querySelector(".app1"), this.titleValue);                          
            
        })
        .catch(error => {
            console.log("failed to load the styles and scripts");
        });
        
    }
    
}