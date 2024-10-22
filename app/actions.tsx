import apiClient from "./interceptor";
import { TestProps } from "./provider";

export async function getUserInfos(username: string) {
  const endpoint = `/user/infos/${username}`;
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (e) {
    console.error("error fetching user info in the action file ", e);
    throw e;
  }
}

export async function getResults(username: string) {
  const endpoint = `/user/getResults/${username}`;
  try {
    const response = await apiClient(endpoint);
    return response.data;
  } catch (e) {
    console.error("error fetching results in the action file", e);
    throw e;
  }
}

export async function updateInfos(userDto: TestProps) {
  const endPoint = "/user/updateInfos";
  try {
    const response = await apiClient.post(endPoint, userDto);
    const data = response.data;
    console.log(data);
    return data;
  } catch (e) {
    console.error("error updating infos in the action file : ", e);
    throw e;
  }
}

export async function sendResult(resultDto: any) {
  const endPoint = "/user/addResult";
  try {
    const response = await apiClient.post(endPoint, resultDto);
    const data = response.data;
    console.log(data);
    return data;
  } catch (e) {
    console.error("error adding result in the action file", e);
    throw e;
  }
}


export async function createUser(userDto:any){

  const endPoint = "/user/createAccount"

  try{
    const reponse = await apiClient.post(endPoint,userDto);
  }catch(e){
    throw e;
  }
  
}