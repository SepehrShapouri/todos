//bg-blue-400
//bg-red-400
//bg-green-400
//bg-orange-400
import {BriefcaseBusiness, Shirt,User,WashingMachine} from 'lucide-react'
export const COLORS = [
  { id: 1, value: "blue-400" ,title:'Blue'},
  { id: 1, value: "red-400",title:'Red' },
  { id: 1, value: "green-400",title:'Green' },
  { id: 1, value: "orange-400",title:'Orange' },
] as const;

export const CATEGORIES = [
  { id: 1, title: "Work", icon:BriefcaseBusiness,value: "work" },
  { id: 1, title: "Shopping", icon:Shirt,value: "shopping" },
  { id: 1, title: "Personal", icon:User,value: "personal" },
  { id: 1, title: "Cleaning", icon:WashingMachine,value: "cleaning" },
] as const
