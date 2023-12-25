var box1 = document.getElementById('input1');
var box2 = document.getElementById('input2');


var siteInfoList = [];


if (localStorage.getItem('sitesData') != null) {
    siteInfoList = JSON.parse(localStorage.getItem('sitesData'))
    getInput()
}



function inputOperations() {
    var inputObject = {
        siteName: box1.value,
        siteUrl: box2.value,
    }

    if (box2.value.startsWith('www') && box2.value.endsWith('.com')) {
        siteInfoList.push(inputObject);
        localStorage.setItem('sitesData', JSON.stringify(siteInfoList));
        getInput();
        clearform()
    } else {

        Swal.fire({
            title: "Error",
            text: "Invalid website URL. It should start with www and end with .com.",
            icon: "question",
        });
    }
}


function getInput() {
    bag = "";

    for (var i = 1; i < siteInfoList.length; i++) {

        bag +=
            `
                <tr id="tr">
                    <td scope="row" style="color: #00b554;">${i}</td>
                     <td style="color: #00b554;">${siteInfoList[i].siteName}</td>
                    <td>
                    <button onclick="visitLink(${i})" type="button" class="btn btn-success text-white" id="btn-visit">
                    <i class="fa-solid fa-eye" style="color: #ffffff;"></i>Visit
                    </button>
                    </td>
                    <td><button onclick="deleteItem(${i})" type="button" class="btn text-white"
                     style="background-color: #f47c7c;">
                     <i class="fa-solid fa-trash" style="color: #ffffff;"></i>Delete</button>
                    </td>
                    </tr>
            `
    }

    document.getElementById('tbody').innerHTML = bag;

}


function deleteItem(itemIndex) {

    siteInfoList.splice(itemIndex, 1);
    localStorage.setItem('sitesData', JSON.stringify(siteInfoList));
    getInput();

}


function searchList(value) {
    bag = ""
    for (var i = 1; i < siteInfoList.length; i++) {
        if (siteInfoList[i].siteName.toLowerCase().includes(value.toLowerCase())) {
            bag +=
                `
            <tr id="tr">
            <td scope="row" style="color: #00b554;">${i}</td>
             <td style="color: #00b554;">${siteInfoList[i].siteName}</td>
            <td>
            <button onclick="visitLink(${i})" type="button" class="btn btn-success text-white" id="btn-visit">
            <i class="fa-solid fa-eye" style="color: #ffffff;"></i>Visit
            </button>
            </td>
            <td><button onclick="deleteItem(${i})" type="button" class="btn text-white"
             style="background-color: #f47c7c;">
             <i class="fa-solid fa-trash" style="color: #ffffff;"></i>Delete</button>
            </td>
            </tr>

            `

        }
    }
    document.getElementById('tbody').innerHTML = bag;
}

function clearform() {
    box1.value = "";
    box2.value = "";
}


function visitLink(itemIndex) {
    if (siteInfoList[itemIndex]) {
        var siteUrl = siteInfoList[itemIndex].siteUrl;

        // Check if the URL starts with a valid protocol
        if (!siteUrl.startsWith('http://') && !siteUrl.startsWith('https://')) {
            // If not, add a default protocol (e.g., 'http://')
            siteUrl = 'http://' + siteUrl;
        }

        console.log('Opening URL:', siteUrl);
        window.open(siteUrl, '_blank');
    } else {
        console.error('Invalid index or site information not found.');
    }
}

























