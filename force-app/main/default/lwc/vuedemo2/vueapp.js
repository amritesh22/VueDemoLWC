import mycomponent2 from './component2.js';
import mycomponent from './component.js';
import pexp from './provideexample.js';

export default function loadapp(vue, el, title) {
    const { createApp, defineComponent, h } = vue;
    const maincomponent = defineComponent({
        name: 'parentcomponent',
        render() {
            return h('div', [
                h(mycomponent2(vue), { title: title }),
                //h(pexp(vue)),
                h(mycomponent(vue))
            ]);
        }
    });
    
    const app = createApp(maincomponent).mount(el);
    //return createApp(h(mycomponent2(vue), { title: title })).mount(el);
    //const app = createApp(pexp(vue));

    return app;
}