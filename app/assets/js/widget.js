var SITE_URL = "https://loanoptions.ai";

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
if (params.partnerId) {
    localStorage.setItem('externalPartnerId', params.partnerId);
} else {
    // SET DEFAULT DRIVE IQ PARTNER(REQUIRED)
    if (localStorage.getItem("externalPartnerId") === null) {
        localStorage.setItem('externalPartnerId', '2162');
    }
}

let sourceval = 'LOANOPTIONS';
let sourceUrl = SITE_URL + '/nurses';
let externalPartnerId = localStorage.getItem("externalPartnerId");
let targetSystem = 'SKYNET';

// HOST URL
localStorage.setItem('sourceUrl', sourceUrl);
// SOURCE NAME
localStorage.setItem('source', sourceval);
// TARGET SYSTEM
localStorage.setItem('targetSystem', targetSystem);

if (localStorage.getItem("quote") === null) {
    let quote = {
        type: "CAR_LOAN",
        usage: "CONSUMER",
        amount: "50000",
        term: "5",
        source: sourceval,
        sourceUrl: sourceUrl,
        targetSystem: targetSystem,
        externalPartnerId: externalPartnerId,
    }
    localStorage.setItem('quote', JSON.stringify(quote));
}

function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if (n > max) {
        return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}

let gid = generate(12);

if (localStorage.getItem("quoteId") === null) {
    if (localStorage.getItem("uid") === null) {
        localStorage.setItem("uid", gid);
    } else {

    }
} else {
    localStorage.setItem("uid", localStorage.getItem("quoteId"));
}

let slider = document.getElementById("borrowrange");
let output = document.getElementById("borrowtext");
output.value = slider.value;

slider.oninput = function () {
    output.value = slider.value;
}

function updateValue(e) {
    slider.value = e.target.value;
}

output.addEventListener('change', updateValue);

var yslider = document.getElementById("yearrange");
var youtput = document.getElementById("yeartext");
youtput.value = yslider.value;

yslider.oninput = function () {
    youtput.value = yslider.value;
}

function yupdateValue(e) {
    yslider.value = e.target.value;
}

youtput.addEventListener('change', yupdateValue);

$('input[type="radio"].loanType').on('change', function () {
    if ($(this).is(':checked')) {
        let checkedValue = $(this).val();
        localStorage.setItem("loanType", checkedValue);

        $('#form-tab-1').hide();
        $('#form-tab-2').fadeIn();

        $('.checkedValue').html(checkedValue);
        $(`.unusedoption`).fadeIn();
        $(`.unusedoption[data-src="${checkedValue}"]`).hide();
        $('.loanSvg').hide();
        $(`.loanSvg[data-src="${checkedValue}"]`).fadeIn();
    }
});

$('.show-form-tab-1').on('click', function () {
    $('.form-tab').hide();
    $('#form-tab-1').fadeIn();
});

$('.show-form-tab-2').on('click', function () {
    $('.form-tab').hide();
    $('#form-tab-2').fadeIn();
});

$('.show-form-tab-3').on('click', function () {
    $('.form-tab').hide();
    $('#form-tab-3').fadeIn();
});

function updateLoacalStorage(typeval, usageval) {
    let amount = $("#borrowrange").val();
    let year = $("#yearrange").val();

    let quote = {
        type: typeval,
        usage: usageval,
        amount: amount,
        term: year,
        source: sourceval,
        sourceUrl: sourceUrl,
        targetSystem: targetSystem,
        externalPartnerId: externalPartnerId,
    }

    localStorage.setItem('quote', JSON.stringify(quote));
}

$("#loanWidgetForm").on('submit', function (e) {
    e.preventDefault();

    let arr;

    switch (localStorage.getItem("loanType")) {
        case "Training & Education":
            arr = ["PERSONAL_LOAN", "CONSUMER"];
            break;

        case "Inventory":
            arr = ["EQUIPMENT_LOAN", "CONSUMER"];
            break;

        case "Fitout":
            arr = ["EQUIPMENT_LOAN", "CONSUMER"];
            break;

        case "Devices":
            arr = ["EQUIPMENT_LOAN", "CONSUMER"];
            break;

        case "Vehicle":
            arr = ["CAR_LOAN", "CONSUMER"];
            break;
    }


    updateLoacalStorage(arr[0], arr[1]);

    window.location.href = SITE_URL + '/application';
});