import axios from 'axios';
import { AxiosInstance } from 'axios'

const config = {
  headers: {
    'Authorization': 'Bearer your_access_token',
    'Content-Type': 'application/json'
  },
  baseURL: 'http://localhost:8080/',
};

const instance: AxiosInstance = axios.create(config);

export function ipfsToWeb(link: string): string {
  // Split the string using '/' as the delimiter
  const splitArray = link.split('://');

  // Get the last element of the array
  const lastElement = splitArray[splitArray.length - 1];
  return `https://${lastElement}.ipfs.w3s.link/`
}

export async function getCollectionData(collId: number) {
  console.log(`Getting data for ${collId}`)
  const resp = await instance.get(`/collections/${collId}`);
  return resp.data;
}

export async function getRecommendations() {
  const resp = await instance.get("/collections");
  console.log(resp);
  return resp.data;
}

export async function getUserFromAddress(address: string) {
  const resp = await instance.get(`/users/?users=${address}`);
  console.log(resp);
  if (resp.data.length > 0) {
    return resp.data[0];
  }
  return null
}

export async function getUserCollections(userId: number) {
  const resp = await instance.get(`/users/${userId}/collections`);
  return resp.data;
}

export function getPins() {
  const pins = [
    {
      color: '#2b3938',
      height: 316,
      src: 'https://i.ibb.co/sQzHcFY/stock9.jpg',
      width: 474,
      name: 'the Hang Son Doong cave in Vietnam',
    },
    {
      color: '#8e7439',
      height: 1081,
      src: 'https://i.ibb.co/zNDxPtn/stock10.jpg',
      width: 474,
      name: 'La Gran Muralla, Pekín, China',
    },
    {
      color: '#698157',
      height: 711,
      src: 'https://i.ibb.co/M5TdMNq/stock11.jpg',
      width: 474,
      name: 'Plitvice Lakes National Park, Croatia',
    },
    {
      color: '#4e5d50',
      height: 632,
      src: 'https://i.ibb.co/r0NZKrk/stock12.jpg',
      width: 474,
      name: 'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
    },
    {
      color: '#6d6368',
      height: 710,
      src: 'https://i.ibb.co/zmFd0Dv/stock13.jpg',
      width: 474,
      name: 'Border of China and Vietnam',
    },
  ];

  const pinList = [...new Array(3)].map(() => [...pins]).flat();
  return Promise.resolve(pinList);
}
