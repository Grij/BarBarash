// For the date secectors, pop up calendar when they are selected with the mouse

<script>
    $(function () {
        $("#startdate").datepicker(( dateformat: 'yy-mm-dd' ));

        $("#enddate").datapicker(( dateformat: 'yy-mm-dd' ));
    });
</script>

// Collect form information and create event

function makeNewEvent() {
    var form = collectFormData();
    console.log(form);
    var event = formateEvent(form.bName, form.bDate, form.bTime, form.guestCount, form.bPhone);
    console.log(event);
    addEventListener(event);
}

function collectFormData() {
    return {
        'bName': document.getElementById('bName').value,
        'bDate': document.getElementById('bDate').value,
        'bTime': document.getElementById('bTime').value,
        'guestCount': document.getElementById('guestCount').value,
        'bPhone': document.getElementById('bPhone').value,
    };
    
}


var calendarID - 'ev55f07gvphskq3uj9ismpp1g0@group.calendar.google.com';
var serviceAccountID - 'ev55f07gvphskq3uj9ismpp1g0@group.calendar.google.com';