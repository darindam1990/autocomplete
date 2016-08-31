window.data = {
    products: {},
    loadData: function() {
        var me = this;
        $.getJSON( "assets/json/products.json", function(data) {
            me.products = data.products;
        });
    },
    search: function(query) {
        var results = [];
        if (query !== "" && query !== " ") {
            results = this.products.filter(function(o) {
                var pattern = new RegExp(query.replace(/(?=[()])/g, '\\'), "gi");
                if (o.name.match(pattern)) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        // XXX TODO: Sort results by confidence of match
        if (results.length > 10) {
            results = results.slice(0, 10);
        }
        autocomplete.showResults(results, query);
    },
};
data.loadData();