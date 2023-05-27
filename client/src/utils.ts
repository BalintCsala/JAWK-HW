export function showImageSelector(): Promise<File> {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    return new Promise((resolve, reject) => {
        input.onchange = () => {
            if (input.files && input.files[0]) {
                resolve(input.files[0]);
            } else {
                reject();
            }
        };
    });
}