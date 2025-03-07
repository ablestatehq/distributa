/**
 * 
 * @name getBase64
 * @description Convert a file to a base 64 string
 * @param {File} file The file to be converted to a base64 string
 * @returns {Promise<string>} A promise that resolves to a string. 
 */
const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  });
};

export default getBase64;
