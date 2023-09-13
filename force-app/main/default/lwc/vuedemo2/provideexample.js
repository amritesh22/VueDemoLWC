export default function(vue) {
    const { ref, inject } = vue;
    return {
        setup() {            
            const msg = inject('message')            
            return { msg }
        },
        template: `<div>{{msg}}</div>`
    }
}