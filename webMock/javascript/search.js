function search() {
    jQuery.support.cors = true;

    var request = $('#searchinput').val().trim();
    if (request != '') {

        request = request.replace(' ', '+');

        $.ajax({
            url: 'http://api.digitalnz.org/v3/records.json?api_key=svowNJL8JgZVmBMhUzho&text=' + request,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var response = JSON.stringify(data);
                $('#searchresult').val(response);
                // alert(response);
            },
            error: function() {
                alert('error');
            }
        });
    }



}