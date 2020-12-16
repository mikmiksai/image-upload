(function () {

    let fileInput = document.getElementById('fileInput'); //input[type=file]
    fileInput.value = ''; //When refreshing page, remove values in input[type=file]
    let selectedImg = []; // temporary storage for selected images
    let preview = document.getElementById('preview');
    let editBtn = document.getElementById('editBtn');
    let submitBtn = document.getElementById('submitBtn');
    let numSelectedImg = document.getElementById('numSelectedImg');

    let numOfAllowedImages = 5;


    function previewMultipleImages() {
        let files = fileInput.files;

        function readAndPreview(file) {
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {
                    var image = new Image();
                    image.height = 100;
                    image.title = file.name;
                    let fileSize = file.size / 1024 / 1024;
                    let fileSizeName = '';

                    if (fileSize > 1) {
                        //File exceed 1 Mb
                        fileSizeName = Math.ceil(fileSize) + ' mb';
                    } else {
                        //File below 1 Mb (kb)
                        fileSize = file.size / 1024;
                        fileSizeName = Math.ceil(fileSize) + ' kb';
                    }

                    image.src = this.result;
                    console.log(selectedImg.length);

                    if (selectedImg.length != numOfAllowedImages) {

                        let imageWrapper = document.createElement('DIV');
                        let bodyTextWrapper = document.createElement('DIV');
                        let imageTitle = document.createElement('P');
                        let fileSizeTitle = document.createElement('P');
                        let removeImageBtn = document.createElement('BUTTON');

                        selectedImg.push(image.src);
                        removeImageBtn.innerText = "X";
                        removeImageBtn.classList.add('remove-upload-btn');

                        numSelectedImg.innerText = selectedImg.length;

                        //Add remove button
                        removeImageBtn.addEventListener('click', function () {
                            let parent = this.parentElement;
                            let sibling = this.previousElementSibling;
                            numSelectedImg.innerText = selectedImg.length -1;

                            //Get the sibling src index to remove value in temporary 'selectImg' array
                            let siblingSrc = sibling.getAttribute('src');
                            let siblingIndex = selectedImg.indexOf(siblingSrc);
                            selectedImg.splice(siblingIndex, 1);
                            // End - Get the sibling src index to remove value in temporary 'selectImg' array

                            parent.remove(); //Remove seleted image, whole div
                        });

                        imageTitle.innerText = image.title;
                        fileSizeTitle.innerText = fileSizeName;

                        bodyTextWrapper.appendChild(imageTitle);
                        bodyTextWrapper.appendChild(fileSizeTitle);

                        imageWrapper.appendChild(image);
                        imageWrapper.appendChild(bodyTextWrapper);
                        imageWrapper.appendChild(removeImageBtn);


                        imageWrapper.classList.add('preview__item');
                        bodyTextWrapper.classList.add('preview__body');

                        preview.appendChild(imageWrapper);
                        // preview.appendChild(fileInputLabel);
                    }
                    else {
                        alert('Reach maximum allowed image to upload');
                    }
                }, false);
                reader.readAsDataURL(file);
            }
        }

        if (files) {
            [].forEach.call(files, readAndPreview);
        }
        submitBtn.style.display = "block";
    }


    fileInput.addEventListener('change', previewMultipleImages);


    //--------------------------------------------------------------
    // Submit button: Pass all the image src in uploadImrSrc array
    //--------------------------------------------------------------
    let uploadImgSrc = [];

    submitBtn.addEventListener('click', function () {
        if (selectedImg.length != 0) {
            previewImg = preview.querySelectorAll('div img');
            previewRemoveBtns = preview.querySelectorAll('div button');

            if (previewImg.length != 0) { // Submit when there is preview/selected images
                for (let i = 0; i < previewImg.length; i++) {
                    uploadImgSrc.push(previewImg[i].getAttribute('src'));
                    previewRemoveBtns[i].remove();
                }
            }
            else {
                alert('Please select images');
            }

            //Create element img for uploadImgSrc.src 
            for (let m = 0; m < uploadImgSrc.length; m++) {
                let uploadImg = document.createElement('img');
                uploadImg.src = uploadImgSrc[m];
                document.getElementById('uploadPreview').appendChild(uploadImg);
            }

            console.log(uploadImgSrc);

            fileInput.disabled = true; // Disable input

            editBtn.disabled = false; // Enable and show edit button
            editBtn.style.display = "block";

            submitBtn.disabled = true; // disable and hide edit button
            submitBtn.style.display = "none";
        }
        else {
            alert('Please select image');
        }

    });
    // END - Submit button: Pass all the image src in uploadImrSrc array



    //--------------------------------------------------------------
    // Edit button: Return all remove buttons 
    //--------------------------------------------------------------
    editBtn.addEventListener('click', function () {
        previewImgDiv = preview.querySelectorAll('.preview__item');
        previewRemoveBtns = preview.querySelectorAll('.remove-upload-btn');

        if (previewRemoveBtns.length == 0) {
            for (let i = 0; i < previewImgDiv.length; i++) {

                let removeImageBtn = document.createElement('BUTTON');
                removeImageBtn.innerText = "X";
                removeImageBtn.classList.add('remove-upload-btn');

                // Add remove button 
                previewImgDiv[i].appendChild(removeImageBtn);

                removeImageBtn.addEventListener('click', function () {
                    let parent = this.parentElement;
                    let sibling = this.previousElementSibling;
                    numSelectedImg.innerText = selectedImg.length - 1;

                    let siblingSrc = sibling.getAttribute('src');
                    console.log(`sibling src - ${siblingSrc}`);
                    let siblingIndex = selectedImg.indexOf(siblingSrc);
                    console.log(`sibling index - ${siblingIndex}`);
                    selectedImg.splice(siblingIndex, 1);

                    parent.remove(); //Remove selected image
                });
            }
        }
        uploadImgSrc = []; //Remove all submitted values 

        fileInput.disabled = false; //Enable input

        editBtn.disabled = true; // disable and hide edit button
        editBtn.style.display = "none";

        submitBtn.disabled = false; // Enable and show edit button
        submitBtn.style.display = "block";

        //Remove all Upload Preview 
        let uploadPreviewchildren = document.getElementById('uploadPreview');
        while (uploadPreviewchildren.firstChild) {
            uploadPreviewchildren.removeChild(uploadPreviewchildren.lastChild);
        }
    });
    // END - Edit button: Return all remove buttons 
})();

