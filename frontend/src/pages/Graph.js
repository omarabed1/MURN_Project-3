import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js'
import {Bar} from 'react-chartjs-2'
import { useUserContext } from "../hooks/useUserContext"
import { useEffect ,useState} from "react"
ChartJS.register(
    CategoryScale, 
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)
const Graph = ()=> {
    const {user}=useUserContext()
    const [trips,setTrips]=useState('')
    const [datas,setDatas]=useState()
    useEffect(()=>{
        const fetchTrips = async ()=>{
            const response= await fetch('/api/follow')
            const json = await response.json()
            if(response.ok){
                const labelsArray=[]
                const datasArray=[]
                for(let i=0;i<json.length;i++){
                    labelsArray.push(json[i].location)
                    datasArray.push(json[i].followers)
                }
                setTrips(labelsArray)
                setDatas(datasArray)
            }
        }
        if (user) {
            fetchTrips()
        }
    },[user])
    useEffect(()=>{
        console.log(trips);
    },[trips])
    const options ={
        responsive:true,
        plugins:{
            legend:{
                position:"top"
            },
            title:{
                display:true,
                text:"best trip"
            },
        },
    };
    const labels=trips
    const data = {
        labels,
        datasets:[
            {
                label:'who have the must follow',
                data: datas,
                backgroundColor:"rgb(26,172,131)",
            },
        ],
    }
        return (
            <div>
                <Bar options={options} data={data}/>

            </div>
        );
}
export default Graph

 