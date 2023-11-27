export default function makeId() {
  // Initialize an empty string for the result
  var result = "";

  // Define the characters to be used in the ID
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  // Calculate the length of the characters string for later use
  var charactersLength = characters.length;

  // Loop to generate a 50-character random string
  for (var i = 0; i < 50; i++) {
    // Append a random character from the characters string to the result
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Return the generated string
  return result;
}