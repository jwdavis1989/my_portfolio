//Function that takes the user uploaded image file, then stores it as a 64bit url I think
function uploadImage()
{
    var data = 
    {
        title: document.getElementById('title').value,
        image: document.getElementById('file').files[0]
    }
    
    //img.src     = URL.createObjectURL(img);   //USE THIS TO RETRIEVE IT FROM THE DB

    //Call path to post the saved data to the database
    try {
        const res = await fetch('http://40.122.146.213/gallery', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        });
        
        if (res.redirected) {
            return window.location = res.url;
        }

        if (res.status === 403) {
            alert("You can't do that");
        } else if (res.status === 200) {
            //TODO Success Message!
        }
    } catch (err) {
        console.log(err);
    }
}