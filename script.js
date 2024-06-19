window.addEventListener("DOMContentLoaded", function () {
    var vpwidth = document.body.clientWidth;
    var imageInput = document.getElementById("inputImage");
    var download = function () {
        var link = document.createElement('a');
        link.download = 'filename.png';
        link.href = document.getElementById('ImageCanvas').toDataURL()
        link.click();
    }
    imageInput.addEventListener('change', tackleImagePayload);
    var cnvs = document.getElementById("ImageCanvas");
    var ctx = cnvs.getContext('2d');
    var imageInputSteg = document.getElementById("inputStegImage");
    imageInputSteg.addEventListener('change', decodeStegImage);


    function tackleImagePayload(event) {
        console.log("Image was loaded sucssesfully!");
        let txt = document.getElementById("enterText").value;
        txt += "~";
        console.log(txt);
        var flreader = new FileReader();
        flreader.addEventListener('loadend', function () {
            console.log("File Read!");
            var elmntImage = new Image();
            elmntImage.addEventListener('load', function () {
                console.log("Image Read!");
                cnvs.width = elmntImage.width;
                cnvs.height = elmntImage.height;

                // scaling the canvas element;
                document.getElementById('ImageCanvas').style.width = String(vpwidth+"px");
                document.getElementById('ImageCanvas').style.height = String((vpwidth*elmntImage.height)/elmntImage.width)+"px";

                ctx.drawImage(elmntImage, 0, 0);

                let pxlary = ctx.getImageData(0, 0, cnvs.width, cnvs.height);
                console.log(pxlary.data);
                let i = 1;

                for( let chrindx in txt){
                    let bnstr = txt.charCodeAt(chrindx).toString(2);
                    console.log(`${txt[chrindx]} in binary rep. `+bnstr);
                    while(bnstr.length < 7){
                        bnstr = "0"+bnstr;
                    }
                    for(let tempCount = 0; tempCount < 7; tempCount += 1) {
                        console.log(`Old green pixel value at ${i} `+pxlary.data[i]);
                        let pxldtbnr = pxlary.data[i].toString(2);

                        while(pxldtbnr.length < 8){
                            pxldtbnr = "0"+pxldtbnr;
                        }
                        pxldtbnr = pxldtbnr.split('');
                        pxldtbnr[7] = bnstr[tempCount];
                        pxldtbnr = pxldtbnr.join('');
                        
                        pxlary.data[i] = parseInt(pxldtbnr, 2);
                        console.log(`new green pixel value at ${i} `+pxlary.data[i])
                        i += 4;
                    }
                }


                console.log(pxlary.data);
                ctx.putImageData(pxlary,0,0);
                download();
            });
            elmntImage.src = flreader.result;
        });
        if (event.target.files[0]) {
            flreader.readAsDataURL(event.target.files[0]);
        }

    }

    function decodeStegImage(event) {
        console.log("Image was loaded sucssesfully!");
        var flreader2 = new FileReader();
        flreader2.addEventListener('loadend', function () {
            console.log("File Read!");
            var elmntImage2 = new Image();
            elmntImage2.addEventListener('load', function () {
                console.log("Image Read!");
                cnvs.width = elmntImage2.width;
                cnvs.height = elmntImage2.height;

                // scaling the canvas element;
                document.getElementById('ImageCanvas').style.width = String(vpwidth+"px");
                document.getElementById('ImageCanvas').style.height = String((vpwidth*elmntImage2.height)/elmntImage2.width)+"px";

                ctx.drawImage(elmntImage2, 0, 0);

                var pxlary = ctx.getImageData(0, 0, cnvs.width, cnvs.height);
                var pxlaryData = pxlary.data;
                console.log(pxlaryData);

                var outputStrng = "";
                var pixelPos = 1;
                var flag = true;
                var tempStrngFrChr = "";

                while(flag) {
                    let pxldtbnr = pxlaryData[pixelPos].toString(2);
                    console.log(pxldtbnr);
                    tempStrngFrChr += pxldtbnr[pxldtbnr.length-1];
                    if(tempStrngFrChr.length === 7) {
                        var tempDgt = parseInt(tempStrngFrChr,2);
                        outputStrng += String.fromCharCode(tempDgt);
                        console.log(outputStrng);
                        var tempStrngFrChr = "";
                        if(String.fromCharCode(tempDgt) == "~") flag = false;
                    }
                    pixelPos += 4;
                }

                console.log(outputStrng);
                document.getElementById("TextOutput").textContent = outputStrng;
            });
            elmntImage2.src = flreader2.result;
        });
        if (event.target.files[0]) {
            flreader2.readAsDataURL(event.target.files[0]);
        }

    }

});