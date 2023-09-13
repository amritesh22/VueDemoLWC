import { LightningElement, track } from "lwc";
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import vuejs from '@salesforce/resourceUrl/vuejs';
import vueapp from './vuedirectapp.js';

//import getAccounts from "@salesforce/apex/AccountController.getAccounts";

export default class Vuedemo extends LightningElement {
    
    vueApp; // Class property to hold the instance of the framework  
    vueApp2;  
    eventValue; // Class property to hold the event value sent from the 3rd party framework
    titleValue = "Account List"; // Class property to hold the (inital) title value
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
            const { createApp, h, ref, reactive } = vue;
            this._store = reactive({ title: this.titleValue });         
                        
            const vueapp1 = createApp(vueapp(vue, this._store));

            /*const vueapp1 = createApp({
                setup() {
                    const comp = ref(null)
                    return () => { 
                        return h(app1(vue, this._store), { ref: comp } ) 
                    }
                }            
            });*/
                        
            vueapp1.config.errorHandler = (err) => {
                console.log(err);
            }            
            this.vueApp = vueapp1.mount(this.template.querySelector(".app1"));                        
            
        })
        .catch(error => {
            console.log("failed to load the styles and scripts");
        });
        
    }
    
    // Key up handler for the outer property input field
    handleKeyUp(event) {
        this._store.title = event.target.value;        
    }

    // Event handler for receiving the account Id from Vue
    handleSendAccount(event) {
        event.stopPropagation();
        this.eventValue = event.detail.accountId;
    }
    
}