"use strict"

const list = $("#list");
const input = $("#input");
const modal = $("#modal");
const confirmBtn = $("#confirm-btn");
const cancelBtn = $("#cancel-btn");
const undoStack = [];

$("#add-btn").on("click", addItem);

function addItem() {
    const itemText = input.val().trim();
    if (itemText !== "") {
        const date = new Date();
        const doneDate = $("<span>").text(date.toISOString());
        const item = $("<li>").addClass("list-group-item d-flex justify-content-between user-select-none").text(itemText);
        const deleteBtn = $("<button>").addClass("btn btn-danger float-end ms-2").text("X");
        deleteBtn.on("click", deleteItem);
        item.append(doneDate);
        doneDate.hide();
        item.append(deleteBtn);
        item.on("click", markAsDone);
        list.append(item);
        input.val("");
    }
  }

function markAsDone() {
    const item = $(this);
    item.css({
        textDecoration: "line-through",
        color: "gray"
    });
    item.off("click");
    item.on("click", unmarkAsDone);
    const secondToLast = item.children().eq(0);
    secondToLast.show();
}

function unmarkAsDone() {
    const item = $(this);
    item.css({
        textDecoration: "none",
        color: "black"
    });
    item.off("click");
    item.on("click", markAsDone);
    const secondToLast = item.children().eq(0);
    secondToLast.hide();
}

function deleteItem(event) {
    const item = $(this).parent();
    event.stopPropagation();
    modal.show();

    confirmBtn.on("click", function() {
        if(undoStack.length < 1){
            undoStack.push(item);
        }
        item.remove();
        modal.hide();
    });

    cancelBtn.on("click", function() {
        modal.hide();
    });
}

$("#undo-btn").on("click", function(event) {
    if (undoStack.length > 0) {
        const item = undoStack.pop();
        list.append(item);
    }
});