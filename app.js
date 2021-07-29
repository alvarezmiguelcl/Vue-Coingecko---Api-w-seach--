const app = new Vue({
    el: '#app',
    data: {
        loading: true,
        response: null,
        currencys: [],
        query: ""
    },
    methods: {

    },
    filters: {
        fixedDate(value) {
            return moment(value).locale("en").fromNow();
        },
        fixedPrice(value) {
            let dollarUs = Intl.NumberFormat('en-US');
            return dollarUs.format(value)
        },
    },
    beforeCreate() {
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
            .then(res => {
                this.response = res.data
                this.currencys = this.response
                this.loading = false
            });
    },
    computed: {
        filterCurrencys: function() {
            return this.currencys.filter((currency) => {
                return currency.name.toLowerCase().match(this.query.toLowerCase())
            })
        }
    }
})