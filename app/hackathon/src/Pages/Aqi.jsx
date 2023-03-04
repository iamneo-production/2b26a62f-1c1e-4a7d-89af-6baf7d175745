import { Divider, Grid, Group, Button, Text, Select } from "@mantine/core";
import { Accordion, createStyles, Input, LoadingOverlay } from "@mantine/core";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import './Home.css'
import json from '../Predictions.json';

console.log(json)

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    border: "1px solid transparent",
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      transform: "scale(1.03)",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

const Home = () => {
  const navigate = useNavigate()
  if(localStorage.getItem('email') == null) {
      navigate('/')
  }
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [info, setInfo] = useState("");
  const { searchData, login, addQuestion } = useContext(AuthContext);
  const { classes } = useStyles(); 
  let ack = 'Add to Profile'
  const [num, setNum] = useState([])
  const sendData = async () => {
    let info = []
    let k = 1, l = 1;
    const final = json[value].map(item => {
       if(item == 1) {
         info.push({year: 2023,month: l, day: k})
       }
       if(k == 31 && l == 1) {
          l++;
          k = 0;
       }
       if(k == 28 && l == 2) {
          l++;
          k = 0;
        }
       k++;
    })
    setSelectedDay(...selectedDay, info);
    setVisible(true);
    const res = await searchData({data: value});
    setData(res.data);
    console.log(res.data);
    // setVisible(false);
  };
  
  const handler = async (i) => {
    setNum(prev =>  [...prev, i])
    console.log(data[i].question + " Added to profile");
    const res = await addQuestion(data[i], localStorage.getItem('email'))
    console.log(res.status)
  }
  const [selectedDay, setSelectedDay] = useState([])
  const [value, setValue] = useState('');
  const minimumDate = {
    year: 2022,
    month:12,
    day: 1
  };

  const maximumDate = {
    year: 2022,
    month: 12,
    day: 31
  }
  return (
    <>
      
      <div style={{marginLeft: '10%'}} >
        <Text size="xl">
            <h1>Air Quality Index Predictor</h1>
        </Text>
        <div>
          
      
        <div style={{display: 'flex', padding: '1rem 2rem'}}>
        <div style={{width: '50%'}}>
          <h1>
            March
          </h1>
           <h3>
           158, 155, 151, 151, 149, 153, 151, 148, 149, 151, 152, 155, 155,
        156, 154, 152, 153, 157, 156, 156, 156, 158, 159, 158, 158, 156,
156, 155
           </h3>
           <Divider size="xs" />
           <h3>
              Monthly Average : 154.21
            </h3>
          </div>
          <div style={{width: '50%'}}>
            
          <h1>
            April
          </h1>
          <h3>
          154, 154, 155, 155, 147, 138, 138, 136, 150, 151, 151, 149, 142,
        141, 140, 140, 141, 142, 141, 145, 147, 145, 145, 132, 130, 137,
        136, 140, 142, 144, 133
          </h3>
          <Divider size="xs" />
          <h3>
              Monthly Average : 143.25
            </h3>
          </div>
          </div>
          </div>
       
          
          <br />
          
          <br />
          <br />
       
        </div>
   
    </>
  );
};

export default Home;
