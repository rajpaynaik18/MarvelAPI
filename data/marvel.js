const axios = require("axios");
const md5 = require("md5");
const data = require(".");
const publickey = "1ea094f00e98c424935fc577ea81e92a";
const privatekey = "b91e2780bbf62f7cfef2efafb0d8f26af6b45232";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
const url2 = "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;

async function getMarvelCharacters(searchTerm) {
  if (!searchTerm || searchTerm === undefined || searchTerm === null)
    throw "Please provide the name of the marvel character.";

  const { data } = await axios.get(
    `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}${url}&limit=20`
  );
  return data;
}

async function getMarvelCharactersById(id) {
  const { data } = await axios.get(
    `https://gateway.marvel.com/v1/public/characters/${id}${url2}`
  );

  // console.log(data);

  return data;
}

module.exports = { getMarvelCharacters, getMarvelCharactersById };
