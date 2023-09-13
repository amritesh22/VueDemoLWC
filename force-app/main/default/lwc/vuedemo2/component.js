export default function(vue) {
    const { ref } = vue;
    return {
        setup() {
            const count = ref(0)
            return { count }
        },
        template: `
        <div>count is {{ count }}</div>
        <button @click="count++">Increase</button>
        `
    }
}