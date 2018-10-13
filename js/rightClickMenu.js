function rightClickAction(action, itemId) {

    var actions = {
        delete: 0,
        edit: 1,
        toPrev: 2,
        toNext: 3
    };

    var itemBase = itemId.substring(0, 5);
    var curNum = Number(itemId.substring(5));
    var prevNum = Number(itemId.substring(5)) - 1;
    var nextNum = Number(itemId.substring(5)) + 1;
    var item = itemBase + curNum;
    var prevItem = itemBase + prevNum;
    var nextItem = itemBase + nextNum;

    switch (actions[action]) {
        case 0: //delete
            $("#" + item).remove();
            break;
        case 1:
            var kind = $("#" + item)[0].getAttribute("kind");
            var itemName = $("#" + item)[0].getAttribute("name");
            $("#renameItem")[0].value = itemName;
            $('#itemName')[0].innerText = "Edit Item: " + itemName;
            $("option[kind='" + kind + "']").prop("selected", true);
            $("#changeItemButton").attr("onclick", "changeItem('#" + item + "')");
            $("#editModal").modal("show");
            break;
        case 2: // to Previous
            if ($("#" + prevItem).length == 0) {
                $("#onPageAlert")[0].innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>' +
                    'No item is existed before ' + $("#" + item)[0].getAttribute("name");
                $("#onPageAlert").fadeTo(1000, 500).slideUp(500, function () {
                    $("#onPageAlert").slideUp(500);
                });
            } else {
                $("#" + item).insertBefore("#" + prevItem); //Change order; current item decreased
                $("#" + item + " p")[0].innerText = prevNum; //indicator number decreased
                $("#" + item).attr('id', prevItem + "-wait"); //holding item
                $("#" + prevItem + " p")[0].innerText = curNum; //previous item's indicator number increased
                $("#" + prevItem).attr('id', item); // previous item id increased
                $("#" + prevItem + "-wait").attr('id', prevItem); //holded current item increased
            }
            break;
        case 3: // to Next
            if ($("#" + nextItem).length == 0) {
                $("#onPageAlert")[0].innerHTML = '<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>' +
                    'No item is existed after ' + $("#" + item)[0].getAttribute("name");
                $("#onPageAlert").fadeTo(1000, 500).slideUp(500, function () {
                    $("#onPageAlert").slideUp(500);
                });
            } else {
                $("#" + item).insertAfter("#" + nextItem); //Change order; current item increased
                $("#" + item + " p")[0].innerText = nextNum; //indicator number increased
                $("#" + item).attr('id', nextItem + "-wait"); //holding item
                $("#" + nextItem + " p")[0].innerText = curNum; //next item's indicator number decreased
                $("#" + nextItem).attr('id', item); // next item id decreased
                $("#" + nextItem + "-wait").attr('id', nextItem); //holded current item increased
            }
            break;
        default:
            break;
    }
};

function changeItem(itemId) {
    var name = $("#renameItem")[0].value;
    var kind = $("#kind")[0].value;
    $(itemId).attr("name", name);
    $(itemId).attr("kind", kind);
    var innerhtm = '\n' + $(itemId + " p")[0].outerHTML;
    if (kind == "button") {
        innerhtm = '<button style="width: 100%; height: 100%">' + name + '</button>' + innerhtm;
    } else {
        if (kind == "image") {
            innerhtm = '<img height="100%" width="100%" alt="' + name + '">' + innerhtm;
        } else {
            if (kind == "input") {
                innerhtm = '<input style="width: 100%; height: 100%" value="' + name + '">' + innerhtm;
            }
        }
    }
    $(itemId)[0].innerHTML = innerhtm;
    $("#editModal").modal("hide");

}