const checkUpload = image => {
    const extension = image.substring(image.indexOf("/") + 1, image.indexOf(";base64"));
    const fileSize = Buffer.byteLength(image, "base64");

    if(extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
        return {error : "Le format de l'image est incorrect"}
    }

    if(fileSize > 500000) {
        return {error : "L'image est trop volumineuse"}
    }

    return {error : null}
}

module.exports = checkUpload;