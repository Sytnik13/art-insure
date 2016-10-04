$(document).ready(function () {
    $("#clearsearch").click(function () {
        $("#clearsearch").fadeOut(300);
        $("#filter").val("");
        $("#tablecontent tbody tr td").removeClass('success');
        $("#tablecontent tbody tr").removeClass('hide');
    });
    $("#filter").keyup(function () {
        var result = $(this).val().replace(/ +?/g, "").toLowerCase();
        if (result != null && result != "") {
            $("#clearsearch").fadeIn(300);
            $("#tablecontent tbody tr").addClass('hide');
            $("#tablecontent tbody tr").find('td').each(function () {
                var tbresult = $(this).text().replace(/ +?/g, "").toLowerCase();
                if (tbresult.indexOf(result) !== -1) {
                    $(this).closest('tr').removeClass('hide');
                    $(this).addClass('success');
                } else {
                    $(this).removeClass('success');
                }
            });
        } else {
            $("#clearsearch").fadeOut(300);
            $("#tablecontent tbody tr").removeClass('hide'); $("#tablecontent tbody tr td").removeClass('success');
        }
    });

    
    var users = [];
    var affiliate = [];


    function getData() {
        $("#tablecontent tbody tr td:nth-child(4)").each(function() {
            console.log(this.innerText);
            var check = users.indexOf(this.innerText);
            console.log(check);
            if (check == -1) {
                users.push(this.innerText);
                console.log(users);
            }
        });

        $("#tablecontent tbody tr td:nth-child(6)").each(function() {
            console.log(this.innerText);
            var check = affiliate.indexOf(this.innerText);
            console.log(check);
            if (check == -1) {
                affiliate.push(this.innerText);
                console.log(users);
            }
        });

        drawData();
    }
    
    function drawData() {
        users.forEach(function(item, i, arr) {
            console.log
            $('#selectUsers').append($('<option>', {
                value: item,
                text: item
            }));
            
        });

        affiliate.forEach(function(item, i, arr) {
            console.log
            $('#selectBranch').append($('<option>', {
                value: item,
                text: item
            }));
            
        });
    }

    getData();

    $(".productCheckbox").change(function() {
        console.log($(this).attr('value'));
        var value = $(this).attr('value');
        if(this.checked) {
            $("#tablecontent tbody tr").addClass('hide');
            $("#tablecontent tbody tr").find('td').each(function () {
                var tbresult = $(this).text().replace(/ +?/g, "").toLowerCase();
                if (tbresult.indexOf(value) !== -1) {
                    $(this).closest('tr').removeClass('hide');
                    $(this).addClass('success');
                } else {
                    $(this).removeClass('success');
                }
            });
        }
    });
    
});