window.autocomplete = {
    addHandlers: function() {
        var me = this;
        $(document).on('keyup', function(evt) {
            var prevSibling, nextSibling;
            if (evt.target.id === "searchbox") {
                if (evt.keyCode === 40) {
                    document.activeElement.nextElementSibling.children[0].focus();
                } else {
                    data.search($(evt.target).val());
                }
            } else if (evt.target.classList.contains('matched_item')) {
                if (evt.keyCode === 38) {
                    prevSibling = document.activeElement.previousElementSibling;
                    if (prevSibling) {
                        prevSibling.focus();
                    } else {
                        document.activeElement.parentElement.previousElementSibling.focus();
                    }
                } else if (evt.keyCode === 40) {
                    nextSibling = document.activeElement.nextElementSibling;
                    if (nextSibling) {
                        nextSibling.focus();
                    } else {
                        document.activeElement.parentElement.previousElementSibling.focus();
                    }
                } else if (evt.keyCode === 13) {
                    me.selectResult(evt);
                }
            }
        });
        $("#searchbox").on('focus', function() {
            var originalQuery = $(this).data('original-query');
            if (originalQuery) {
                $(this).val(originalQuery);
            }
        });
        $("#searchbox").on('blur', function() {
            $(this).data('original-query', $(this).val());
        });
        $(".search_results").on('click', 'li.matched_item', function(evt) {
            me.selectResult(evt);
        });
        $(".search_results").on('focus', 'li.matched_item', function(evt) {
            $("#searchbox").val(this.innerText);
        });
    },
    showResults: function(results, query) {
        var me = this,
            idx, beforeStr, matchStr, afterStr;
        if (results.length > 0) {
            $(".search_results").removeClass('inactive');
        } else {
            $(".search_results").addClass('inactive');
        }
        $(".search_results").empty();
        results.forEach(function(result, i) {
            idx = me.getMatchIdx(result.name, query);
            beforeStr = result.name.substring(0, idx.start);
            matchStr = result.name.substring(idx.start, idx.end+1);
            afterStr = result.name.substring(idx.end+1);
            // a la Google Search style of highlighting
            var $resultDom = `<li tabindex="0" class="matched_item">${beforeStr}<span class="match">${matchStr}</span>${afterStr}</li>`;
            $(".search_results").append($resultDom);
        });
    },
    getMatchIdx: function(str, query) {
        var match,
            pattern = new RegExp(query.replace(/(?=[()])/g, '\\'), "gim");
        while(match = pattern.exec(str)){
            return {
                start: pattern.lastIndex - match[0].length,
                end: pattern.lastIndex-1
            };
        }
    },
    selectResult: function(evt) {
        $("#searchbox").val(evt.target.innerText);
        $("#searchbox").data('original-query', "");
        $(".search_results").addClass('inactive');
    }
};
autocomplete.addHandlers();