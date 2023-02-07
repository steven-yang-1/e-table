class ETable {
    constructor($divFixedHeader, $divTable, top = 0) {
        this.$divFixedHeader = $divFixedHeader;
        this.$divTable = $divTable;

        this.$divFixedHeader.hide();

        this.top = top;

        this._setTdWidth();

        $(document).scroll(() => {
            if ($(document).scrollTop() > this.$divTable.offset().top) {
                this.$divFixedHeader.show();
            } else {
                this.$divFixedHeader.hide();
            }
        });

        this.$divTable.scroll(() => {
            this.$divFixedHeader.width(this.$divTable.width());
            document.getElementById(this.$divFixedHeader.attr("id")).scrollTo(
                this.$divTable.scrollLeft(), 0);
        });

        $(document).scroll(() => {
            this.$divFixedHeader.width(this.$divTable.width());
            document.getElementById(this.$divFixedHeader.attr("id")).scrollTo(
                this.$divTable.scrollLeft(), 0);
        });

        $(window).resize(() => {
            this.$divFixedHeader.width(this.$divTable.width());
            this._setTdWidth();
            document.getElementById(this.$divFixedHeader.attr("id")).scrollTo(
                this.$divTable.scrollLeft(), 0);
        });

        this.$divFixedHeader.offset({
            "left": this.$divTable.offset().left,
            "top": this.top
        });
        this.$divFixedHeader.width(this.$divTable.width());
    }
    _setTdWidth() {
        this.$theadHeader = this.$divFixedHeader.find("table").find("thead");
        this.$theadTable = this.$divTable.find("table").find("thead");
        const tdCount = this.$theadHeader.find("tr").children().length;
        for (let i = 0; i < tdCount; i++) {
            this.$theadHeader.find("tr:nth-child("+i+")").width(this.$theadTable.find("tr:nth-child("+i+")").offsetWidth);
        }
    }
}