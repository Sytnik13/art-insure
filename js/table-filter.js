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

    function getOptions() {
        $("#tablecontent tbody tr td:nth-child(5)").each(function () {
            var check = users.indexOf(this.innerText);
            if (check == -1) {
                users.push(this.innerText);
            }
        });

        $("#tablecontent tbody tr td:nth-child(6)").each(function () {
            var check = affiliate.indexOf(this.innerText);
            if (check == -1) {
                affiliate.push(this.innerText);
            }
        });

        drawOptions();
    }

    function drawOptions() {
        users.forEach(function (item, i, arr) {
            $('#selectUsers').append($('<option>', {
                value: item,
                text: item
            }));

        });

        affiliate.forEach(function (item, i, arr) {
            $('#selectBranch').append($('<option>', {
                value: item,
                text: item
            }));

        });
    }

    getOptions();

    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };


    var products = [];
    $(".productCheckbox").change(function () {
        if (this.checked) {
            products.push($(this).attr('value'));
            filter(products, user, companies, branch);
        } else {
            var position = products.indexOf($(this).attr('value'));
            products.remove(position);
            filter(products, user, companies, branch);

        }
    });

    var companies = [];
    $(".companyCheckbox").change(function () {
        if (this.checked) {
            companies.push($(this).attr('value'));
            filter(products, user, companies, branch);
        } else {
            var position = companies.indexOf($(this).attr('value'));
            companies.remove(position);
            filter(products, user, companies, branch);
        }
    });

    var user = '';
    $("#selectUsers").change(function () {
        var userSelected = $("#selectUsers option:selected").val().toLowerCase();
        if (userSelected === 'allusers') {
            userSelected = '';
            filter(products, user, companies, branch);
        }
        user = userSelected;
        console.log(user);
        filter(products, user, companies, branch);

        
    });

    var branch = '';
    $("#selectBranch").change(function () {
        var branchSelected = $("#selectBranch option:selected").val().toLowerCase();
        if (branchSelected === 'allbranch') {
            branchSelected = '';
            filter(products, user, companies, branch);
        }
        branch = branchSelected;
        console.log(branch);
        filter(products, user, companies, branch);

        
    });

    function filter(productArr, userVal, companyArr, branchVal) {
        $("#tablecontent tbody tr").addClass('hide');
        $("#tablecontent tbody tr").each(function () {
            var trResult = $(this).text().replace(/ +?/g, "").toLowerCase();
            var productCheck = false;
            var companyCheck = false;

            if (productArr.length > 0) {   
                productCheck = false;
            } else {
                productCheck = true;
            }

            if (companyArr.length > 0) {   
                companyCheck = false;
            } else {
                companyCheck = true;
            }
            
            for (var product = 0; product < productArr.length; product++) {
                if (trResult.indexOf(productArr[product]) !== -1) {
                    productCheck = true;
                }
            }

            for (var company = 0; company < companyArr.length; company++) {
                if (trResult.indexOf(companyArr[company]) !== -1) {
                    companyCheck = true;
                }
            }

            if (trResult.indexOf(userVal) !== -1 && trResult.indexOf(branchVal) !== -1 && productCheck === true && companyCheck === true) {
                $(this).closest('tr').removeClass('hide');
            }
            
        });
    };
  
});