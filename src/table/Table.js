import _ from 'lodash';

export default class Table {
    constructor(list, yGet, xGet, ySet, xSet, clearValue){
        this.list = list;
        this.yGet = yGet;
        this.xGet = xGet;
        this.ySet = ySet;
        this.xSet = xSet;
        this.clearValue = clearValue;

        this.rows = this.rows.bind(this);
        this.columns = this.columns.bind(this);
        this.dimmensionInSlices = this.dimmensionInSlices.bind(this);
        this.addRow = this.addRow.bind(this);
        this.addColumn = this.addColumn.bind(this);
        this.sorted = this.sorted.bind(this);
    }

    sortByGetter(valA, valB, getter){
        return getter(valA) - getter(valB);
    }

    reverseSort(val){
        return -1 * val;
    }

    sorted() {
        this.list = this.list.sort(
            (cellA, cellB) => this.reverseSort(this.sortByGetter(cellA, cellB, this.yGet)) || this.sortByGetter(cellA, cellB, this.xGet)
        );
        return this;
    }

    //Returns a list of lists
    //  Each sublist is a list of cells that all have the same y value
    rows() {
        return this.dimmensionInSlices(this.yGet);
    }

    columns() {
        return this.dimmensionInSlices(this.xGet);
    }

    dimmensionInSlices(dimmensionGetter){
        return Object.values(_.groupBy(this.list, dimmensionGetter))
    }

    addRow() {
        return this.addToDimension(this.rows, this.ySet)
    }

    addColumn() {
        return this.addToDimension(this.columns, this.xSet)
    }

    addToDimension(dimensionInSlicesGetter, setterForDimension) {
        var currentDimension = dimensionInSlicesGetter();
        var maxInDimension = currentDimension.length - 1;
        
        currentDimension[maxInDimension]
            .forEach(element => {
                let newCell = Object.assign({}, element)
                setterForDimension(newCell, maxInDimension + 1);
                this.clearValue(newCell);
                this.list.push(newCell);
            });
        return this;
    }
};