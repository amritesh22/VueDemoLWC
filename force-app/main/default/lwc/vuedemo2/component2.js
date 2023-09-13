export default function(vue) {
    const { ref, inject } = vue;
    return {
        props: {
            title: String
        },
        setup(props) {
            const msg = props.title //inject('message')            
            return { msg }
        },
        template: `<div>Title : {{msg}}</div><br/><br/>`
    }
}