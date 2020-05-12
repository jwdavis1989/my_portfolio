//Call the images JSON array from the database

var Gallery = 
{
    userID: "none",
    currentPage: 1,
    totalPages: 1,
    numberOfImages: 0,
    imageList: [],

    setData: function()
    {
        var url = window.location.pathname;
        this.userID = url.substring(url.lastIndexOf('/') + 1);

        //Requests image JSON from server
        async function generateSentence (event) {
            fetch(`http://40.122.146.213/gallery/${this.userID}`, {
                method: 'GET'
            }).then( res => {
                console.log(res)
                return res.json();
            }).then( data => {

                //Waits for reply, then populates the imageList array with loaded images
                imageList = data.images;
                // log the data
                console.log(data);
            }).catch( err => {
                console.log(err);
            });
        }

        //Calculate Number of Pages
        this.numberOfImages = length(data.images);
        this.totalPages = ceil(this.numberOfImages / 4);

        this.render(this.currentPage);
    },

    render: function()
    {
        //Generate new html/css code for the imageGrid div
        console.log('Rendering Beginning . . .');

        //Create Temporary Variables to resize Grid appropriately
        var tableWidth = 100;
        var imageWidth = tableWidth/100 * (screen.width/4);
        console.log(`Table Width: ${tableWidth}%`);
        console.log(`Image Width: ${imageWidth}px`);

        //Create Temp String that will contain everything, initialize it to nonlooping beginning of html
        var tempHTML = `<style>
        .imageTable {
        margin-left:auto; 
        margin-right:auto;
        border-spacing: 0;
        border-collapse: collapse;
        width:${tableWidth}%;
        }
        
        .imageTable tr, .imageTable td {
        border: none;
        padding: 0px;
        vertical-align: top;
        position: relative;
        width: ${imageWidth}px;
        height: ${imageWidth}px; 
        }
        </style>
        <table class="imageTable"'> 
            <tbody>
                <tr>`;
                //Create a temp iterator that tracks how many images are left to display total
                imagesDisplayed = 0;

                //For Each Image
                for (var i = ((this.currentPage-1) * 4); i < (this.currentPage * 4);i++)
                {
                    tempHTML += `<td>`;
                    //Draw the Image
                    tempHTML += `<img src="${this.imageList[i].gridImage}">`;
                    tempHTML += `</td>`;
                }
        tempHTML += `</tr>
                </tbody>
        </table>`;

        document.getElementById("imageGrid").innerHTML = tempHTML;
        console.log('Rendering Complete.');
        },

    loadNextPage: function()
    {
        //Cycles to the next page of images
        if (this.currentPage < this.totalPages)
        {
            this.currentPage++;
            this.render();
        }
        console.log(`Current Page: ${this.currentPage}`);
    },

    loadPreviousPage: function()
    {
        //Cycles to the previous page of images
        if (this.currentPage > 1)
        {
            this.currentPage--;
            this.render();
            console.log(`Current Page: ${this.currentPage}`);
        }
    }
}