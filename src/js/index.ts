import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IMusic{
    titel: string,
    artist: string,
    duration: number,
    year: number,
    id: number
}

let baseUri: string = "http://musicrest.azurewebsites.net/api/Musics";

let GetAllButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("GetAllButton");
let GetAllOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("GetAllOutput");
let AddButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("AddButton");
let AddOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("AddOutput");

let AddTitel: HTMLInputElement = <HTMLInputElement>document.getElementById("AddTitel");
let AddArtist: HTMLInputElement = <HTMLInputElement>document.getElementById("AddArtist");
let AddDuration: HTMLInputElement = <HTMLInputElement>document.getElementById("AddDuration");
let AddYear: HTMLInputElement = <HTMLInputElement>document.getElementById("AddYear");

let DeleteThisButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("DeleteButton");
let DeleteThisInput: HTMLInputElement = <HTMLInputElement>document.getElementById("DeleteId");
let DeleteThisOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("deleteOutput");


GetAllButton.addEventListener("click", GetAll);
AddButton.addEventListener("click", addMusic);
DeleteThisButton.addEventListener("click", deleteMusic);


function deleteMusic(){
    let uri: string = baseUri + "/" + DeleteThisInput.value;
    axios.delete<IMusic>(uri)
    .then(function (response: AxiosResponse<IMusic>): void{
DeleteThisOutput.innerHTML = response.status + " " + response.statusText;
    })
}

function addMusic(){
// får automatisk ID fra vores rest der har en +1 til count, hver gang en bliver oprettet
    axios.post<IMusic>(baseUri, {titel: AddTitel.value, artist: AddArtist.value, duration: AddDuration.value, year: AddYear.value})
    .then((response : AxiosResponse) => {
    let message: string = "response " + response.status + " " + response.statusText;
    AddOutput.innerHTML = message;
    })

    .catch((error: AxiosError)=>{
        AddOutput.innerHTML = error.message;
        console.log(error);
    })
    
}

function GetAll(){
    axios.get<IMusic[]>(baseUri)
    .then(function(response: AxiosResponse<IMusic[]>): void {
        let str : string = "<ul>";
        response.data.forEach((Music: IMusic) => {
            str += "<li>" + Music.id + " " + Music.titel + " " + Music.artist + " " + Music.duration + " " + Music.year + "</li>";
        });

        GetAllOutput.innerHTML = str + "</ul>"
    })
    .catch(function (error: AxiosError): void {
        AddOutput.innerHTML = error.message;
    })
}