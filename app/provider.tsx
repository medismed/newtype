import { headers } from "next/headers";
import apiClient from "./interceptor";
import axios from "./interceptor";
import { jwtDecode, JwtPayload} from "jwt-decode";
import { createJwtCookie, deleteCookie } from "./lib/cookies";

const words = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon",
    "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vine",
    "watermelon", "xigua", "yam", "zucchini", "apricot", "blackberry", "blueberry", "cantaloupe", "dragonfruit", "eggplant",
    "fennel", "gooseberry", "huckleberry", "jackfruit", "kumquat", "lime", "mulberry", "nectar", "olive", "peach",
    "pear", "pineapple", "plum", "pomegranate", "rhubarb", "sugarcane", "tomato", "ugli fruit", "valencia", "walnut",
    "yuzu", "zest", "almond", "basil", "coconut", "dill", "endive", "fiddlehead", "grapefruit", "horseradish",
    "jalapeno", "kale", "leek", "mushroom", "nutmeg", "oregano", "parsley", "quinoa", "radish", "shallot",
    "thyme", "vanilla", "wasabi", "yarrow", "ziti", "asparagus", "broccoli", "carrot", "daikon", "eggplant",
    "fava", "garlic", "hazelnut", "iceberg", "jicama", "kohlrabi", "lettuce", "mint", "onion", "pepper",
    "quince", "rutabaga", "spinach", "turnip", "vinegar", "watercress", "yam", "zucchini" , "type" , "dman"
  ];
  
export const nbrs = Array.from({length : 210},(_,i) => i + 1);

const getRandomInt = (min:number,max:number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomWords = (n:number) => {
    const arrayWords:string[] = []
    for (let i = 0 ; i < n ; i++)
        {   let i = getRandomInt(1,99);
            if (arrayWords.includes(words[i])){
                n++;
                continue;
            }
            arrayWords.push(words[i])
        }
    return arrayWords;
}

export type customeCharacter= {
    label : string;
    state : string | null;
    id : number;
}

export const  arrayCharacters  = (line:string) : customeCharacter[] => {

    const cs : customeCharacter[] = []
    let i = 0;
    for (const c of line )
        cs.push({label: c , state : null , id : i++})
    return cs
}
export type TestProps  = {
    getInfos? : (start:Date,end:Date,correctIs:number[],wrongIds:number[]) => void;
    updateState?: () => void;
    wpm?: number;  // Optional properties
    ts?: number;
    nc?: number;
    nw?: number;
    userDto? : {id:number,name : string,age:number,email:string,phone:string,sex:string,username:string,password:string,country:string};
    resultDto?: {folder_Id:number,wpm:number,date:string,chars:string}
    
}

export interface CustomJwtPayload extends JwtPayload{
    scope:string[];
    sub?: any;
    userId?: any;
    folderId?: any;
}

export const login = async (username:string,password:string) => {

    try
    {
        const options = {headers:{
            "Content-Type": "application/x-www-form-urlencoded",
        },};

        const url = "http://localhost:8080/auth/login";
        const params = new URLSearchParams();
        params.append("username",username);
        params.append("password",password);
        const res = await axios.post(url,params,options)

        if(res.status === 200)
        {
            const decodeJwt = jwtDecode<CustomJwtPayload>(res.data['access-token'])
            const roles = decodeJwt.scope;
            await createJwtCookie("jwt",res.data['access-token']);
            await createJwtCookie("isAuthenticated",true);
            await createJwtCookie("roles",roles);
            return res.data;
        }
        
    }
    catch(error){
        console.error("there is an error is the provider file : " ,error)
    }

}
export const logout = async () => {
    await deleteCookie("jwt");
    await deleteCookie("isAuthenticated");
    await deleteCookie("roles");
    if (typeof window !== 'undefined') {
        localStorage.removeItem("gUsername");
        localStorage.removeItem("userId");
        localStorage.removeItem("folder_Id");
      }
}