'use client';

import { Delete } from "lucide-react";
import { DeleteIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import Card from '@mui/material/Card';
import { Button } from "@mui/material";
import { useState } from "react";

export const InputExpensex = ({ exp, setExp }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(null);

    const handleClick = () => {
        const err = "Error";
        const dt = new Date();
        if (title == '' || amount <= 0 ) {
            alert("Input Error");
        } else {
            setExp((pexp) => [...pexp, { name: title, data: date, prize: amount }]);
        }

    }


    return (
        <Card className="iecd">
            <div>
                <h2>Add New Expense</h2>
                <h3>Enter the detail of your exp</h3>
            </div>

            <div className="ieform">
                <label htmlFor="">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="What did you spend ?" />

                <label htmlFor="">Amount</label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="0.00" />

                <label htmlFor="">Date</label>
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />

                <Button onClick={handleClick} variant="contained">Add Expense</Button>
            </div>
        </Card>
    )
}