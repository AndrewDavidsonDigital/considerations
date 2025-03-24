export function dataURItoBlob(dataURI) {
    // Return null for invalid or empty data URIs
    if (!dataURI || !dataURI.startsWith('data:')) {
        return null;
    }

    const parts = dataURI.split(',');
    if (parts.length !== 2) {
        return null;
    }

    // separate out the mime component
    const mimeString = parts[0].split(':')[1].split(';')[0];
    
    // Handle empty base64 data
    if (!parts[1]) {
        return null;
    }

    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(parts[1]);

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    const ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], {type: mimeString});
}