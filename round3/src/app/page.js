'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { Delete } from "lucide-react";
import { DeleteIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import Card from '@mui/material/Card';
import { TotalExpenses } from "@/componets/TotalExpenses";
import { InputExpensex } from "@/componets/InputExpensex";
import { useState } from "react";
// import CardContent from '@mui/material/CardContent';
const exp = [
  {
    name: "xyz",
    data: 'Apr 26 2024',
    prize: "5.75"
  },
  {
    name: "xyz",
    data: 'Apr 26 2024',
    prize: "85.75"
  },
  {
    name: "xyz",
    data: 'Apr 26 2024',
    prize: "85.75"
  }
]

export default function Home() {
    const [exps,setExp] = useState(exp);




  return (
    <main>
     <TotalExpenses exp={exps} />
     <InputExpensex exp={exps} setExp={setExp}/>
    </main>
  );
}
