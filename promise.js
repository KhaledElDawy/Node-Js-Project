let UploadVideo = new Promise((resolve,reject) =>{
    let complete;
    //complete = true;
    complete = false;

    if(complete)
        {
        resolve("Successfully Uploaded");
        }
        else{
            reject("Failed Upload :(");
        }

});

UploadVideo.then((msg) =>{
    console.log("then is called " + msg);
})
.catch((msg) =>{
    console.log("Catch is Called " + msg);
});