import { Delete } from "lucide-react";
import { DeleteIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import Card from '@mui/material/Card';

export const TotalExpenses = ({exp})=>{
    return (
        <Card className="card">
        <div className="top">
          <h1 className="s">Total Expenses</h1>
          <div>$238.25</div>
        </div>
  
        <div className="do">
          <h2 className="sub">All Expenses</h2>
          <div className="wrp">
          {
            exp.map((item, idx) => (
              <div className="card2" key={idx}>
                <div>
                  <div>{item.name}</div>
                  <div>{item.data}</div>
                </div>
                <div className="pri">
                <div>${item.prize}</div>
                <Trash2/>
                </div>
                
              </div>
            ))
          }
          </div>
        </div>
      </Card>
    )
}