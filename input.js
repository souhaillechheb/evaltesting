const fs = require("fs");
const dataFilePath = "./data.json";

// Fonction pour lire les données à partir du fichier JSON
function readDataFromFile() {
    try {
      const jsonData = fs.readFileSync(dataFilePath);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error("Error reading data from file:", error);
      return [];
    }
  }
  
  // Fonction pour écrire les données dans le fichier JSON
  function writeDataToFile(data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(dataFilePath, jsonData);
    } catch (error) {
      console.error("Error writing data to file:", error);
    }
  }

  module.exports={writeDataToFile,readDataFromFile}