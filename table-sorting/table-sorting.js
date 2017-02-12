var gbAscending = true;
var gbCol = 0;

function addEventHandler(oNode, sEvt, fFunc, bCapture) {
    'use strict';
    oNode.addEventListener(sEvt, fFunc, bCapture);
}

function insertSortControls() {
    'use strict';
    var oLink;
    oLink = document.getElementById('ItemDescend');
    oLink.removeAttribute('href');
    addEventHandler(oLink, "click", function () {
        sortTable('theList', 0, true)
    }, false);
    oLink = document.getElementById('ItemAscend');
    oLink.removeAttribute('href');
    addEventHandler(oLink, "click", function () {
        sortTable('theList', 0, false)
    }, false);
    oLink = document.getElementById('PriceDescend');
    oLink.removeAttribute('href');
    addEventHandler(oLink, "click", function () {
        sortTable('theList', 1, true)
    }, false);
    oLink = document.getElementById('PriceAscend');
    oLink.removeAttribute('href');
    addEventHandler(oLink, "click", function () {
        sortTable('theList', 1, false)
    }, false);
}

function sortCallBack(a, b) {
    'use strict';
    // each of the arguments passed to this function is a TR node
    // with one or more child TD nodes.
    // get the child node of each TR element that corresponds
    // to the column to be sorted.
    var col1 = a.getElementsByTagName("TD")[gbCol],
        col2 = b.getElementsByTagName("TD")[gbCol],

        // now get the text node for each col
        text1 = col1.firstChild.data,
        text2 = col2.firstChild.data;

    // now that we have the text nodes, do the sorting
    if (text1 < text2)
        return gbAscending ? -1 : 1;
    else if (text1 > text2)
        return gbAscending ? 1 : -1;
    else return 0;
}

function sortTable(whichTable, whichCol, sortDir) {
    'use strict';
    // get the table object that has the ID we were given as an argument
    var oTable = document.getElementById(whichTable),

        // begin by getting the node for the TBODY, since that
        // node contains all the rows to be sorted
        oTBody = oTable.getElementsByTagName('TBODY')[0],

        // get all of the TR tags within the tbody
        aTRows = oTBody.getElementsByTagName('TR'),

        // store the length of the TR array
        numRows = aTRows.length;

    gbAscending = sortDir;
    gbCol = whichCol;

    // make an array to hold each TR tag in the body.
    var theSortedRows = new Array(numRows),

        // copy each TR tag into the array. Do a "deep clone" on
        // each TR tag so that all of the child TD tags come along
        // with it.
        i;
    for (i = 0; i < numRows; i++) {
        theSortedRows[i] = aTRows[i].cloneNode(true);
    }

    // now -- sort the array!
    theSortedRows.sort(sortCallBack);

    // now that the array has been sorted, we put back all of the
    // table rows that we had copied out earlier.

    // First, get rid of the the current TBODY.
    oTable.removeChild(oTBody);

    // make a new one in its place
    oTBody = document.createElement("TBODY");
    oTable.appendChild(oTBody);

    // now insert all of the sorted TR tags from the sorted array
    for (i = 0; i < numRows; i++) {
        oTBody.appendChild(theSortedRows[i]);
    }
}

addEventHandler(window, 'load', insertSortControls, false);