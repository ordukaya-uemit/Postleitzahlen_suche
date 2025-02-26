$(document).ready(function () {
    $('#Postleitzahl').on('blur', function () {
        const cityField = $('#Stadt');
        cityField.remove('list').val('');
        $('#cityList').remove();
        const plz = $(this).val().trim();
        $(this).val(plz);
        if (!plz) {
            return;
        }
        let apiUrl;
        if (plz.length == 5 && !isNaN(plz)) {
            apiUrl = `https://openplzapi.org/de/localities?postalCode=${plz}`;
        } else if (plz.length == 4 && !isNaN(plz)) {
            apiUrl = `https://openplzapi.org/at/localities?postalCode=${plz}`;
        } else {
            alert("Das ist keine gültige PLZ, bitte überprüfen Sie ihre Eingabe");
            return;
        }
        $.getJSON(apiUrl)
            .done(function (data) {
                let cities = [];
                data.forEach(function (city) {
                    cities.push(city.name);
                });
                data = [...new Set(cities)]; // remove duplicates
                if (data.length > 0) {
                    if (plz.length == 5) {
                        $('#Land').val('Deutschland');
                    } else {
                        $('#Land').val('Österreich');
                    }
                } else {
                    $('#Land').val('');
                }

                if (data.length === 1) {
                    cityField.val(data[0]);
                } else if (data.length > 1) {
                    cityField.attr('list', 'cityList');
                    var dataList = $('<datalist id="cityList"></datalist>');
                    data.forEach(function (city) {
                        var option = $('<option></option>').attr('value', city);
                        dataList.append(option);
                    });
                    cityField.append(dataList);
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Error fetching data:', textStatus, errorThrown);
            });

    });
});