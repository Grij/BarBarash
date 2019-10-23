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