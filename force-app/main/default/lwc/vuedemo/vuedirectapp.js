import getAccounts from "@salesforce/apex/AccountController.getAccounts";

export default function(vue, store) {
    const { ref, onMounted, toRef, toRefs } = vue;
    
    return {
        setup() {
            const localstore = toRefs(store)
            const title = toRef(store, 'title')
            const selectedAccount = ref('')
            const accounts = ref([])
            const accountList = ref()            

            onMounted(() => {                                                
                getAccounts()
                .then((result) => {
                    accounts.value = result;                    
                })
                .catch((error) => {
                    console.log(error);
                })
            })

            function handleClick(acc) {
                selectedAccount.value = acc.Name;                
                const evt = new CustomEvent("sendaccount", {
                    detail: { accountId: acc.Id },
                    bubbles: true,
                    composed: true
                });
                // Here we reference the `accountList` ref to dispatch the native event.
                accountList.value.dispatchEvent(evt);
            }

            return { title, accounts, handleClick, accountList, selectedAccount, localstore }
        },
        template: `
        <b>{{title}}</b>
        <br/><br/>
        <ul ref="accountList">
            <li v-for="account in accounts" :key="account.Id" @click="handleClick(account)">
                {{ account.Id }} - {{ account.Name }}
            </li>
        </ul>
        <br/> 
        Selected Account (local vue property) : {{selectedAccount}}
        `
    }
}