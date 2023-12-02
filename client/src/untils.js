export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false;
    }
    return true;
}
// Chuyển ảnh sang base64
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
    })
export function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };

        reader.onerror = error => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}
export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}