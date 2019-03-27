import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import { ICar } from "./ICar";


let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let GetAllCarsbtn : HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllbtn");
GetAllCarsbtn.addEventListener("click", ShowAllCars);

let AddCarbtn : HTMLButtonElement = <HTMLButtonElement> document.getElementById("addCarbtn");
AddCarbtn.addEventListener("click", AddCar );


function AddCar() :void{
    let addmodelelement: HTMLInputElement = <HTMLInputElement> document.getElementById("inputModel")
    let addvendorelement: HTMLInputElement = <HTMLInputElement> document.getElementById("inputVendor")
    let addmpriceelement: HTMLInputElement = <HTMLInputElement> document.getElementById("inputPrice")

    let mymodel : string = addmodelelement.value;
    let myvendor : string = addvendorelement.value;
    let myprice : number = +addmpriceelement.value;

    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars", {
        model: mymodel,
        vendor: myvendor,
        price: myprice
      })
      .then(function (response : AxiosResponse) : void {
        console.log("Statuskoden er :"+response.status);
      })
      .catch(function (error : AxiosError): void {
        console.log(error);
      });
}

function ShowAllCars() : void{
    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")

    .then(function (response : AxiosResponse<ICar[]>): void
    {
        console.log(response);
        
        let result :string = "<ol>"

        response.data.forEach((car: ICar) => {
            //result += "<li>"+car.model + ""+car.vendor+""+car.id+"</li>"
           result += `<li> bil model ${car.model} sælger ${car.vendor} bil id ${car.id} bilen koster ${car.price} kr.</li>`
            
        });
        result += "</ol>"

        ContentElement.innerHTML = result;

    })

    .catch(function(error: AxiosError): void
    {
        console.log("ERROR");
        console.log(error);
    })
    console.log("er i slutningen af ShowAllCars function");
}



// ShowAllCars();