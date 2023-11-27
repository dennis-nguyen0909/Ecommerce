export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false;
    }
    return true;
}
// Chuyển ảnh sang base64
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
    })
}