import _ from 'lodash';

export default class Table {
    constructor(list, xRetriever, yRetriever){
        this.list = list;
        this.xRetriever = xRetriever;
        this.yRetriever = yRetriever;

        this.rows = this.rows.bind(this);
        this.sorted = this.sorted.bind(this);
    }

    sortByRetriever(valA, valB, retrieve){
        return retrieve(valA) - retrieve(valB);
    }

    reverseSort(val){
        return -1 * val;
    }

    sorted() {
        this.list = this.list.sort(
            (cellA, cellB) => this.reverseSort(this.sortByRetriever(cellA, cellB, this.yRetriever)) || this.sortByRetriever(cellA, cellB, this.xRetriever)
        );
        return this;
    }

    //Returns a list of lists
    //  Each sublist is a list of cells that all have the same y value
    rows() {
        return Object.values(_.groupBy(this.list, this.yRetriever));
    }
};