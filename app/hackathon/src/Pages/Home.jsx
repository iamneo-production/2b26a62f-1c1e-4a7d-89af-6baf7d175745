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
            <h1>Heat Wave Predictor</h1>
        </Text>
        <div>
          
        <h2> 
          Select any district and click on proceed to see the predictions for the January, February
        </h2>
        <div style={{display: 'flex', padding: '1rem 2rem'}}>
        <div style={{width: '50%'}}>

        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          color="#fff"
          colorPrimary="#FF0000"
          
          renderFooter={() => (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 2rem' }}>
              <button
                type="button"
                onClick={() => {
                  setSelectedDay([])
                }}
                style={{
                  border: '#0fbcf9',
                  color: '#fff',
                  backgroundColor: '#0275d8',
                  borderRadius: '0.2rem',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
                >
                Reset Value!
              </button>
            </div>
          )}
          />
          </div>
          <div style={{width: '40%'}}>
             <h3>
              The days predicted heatwaves are marked in red
              </h3>
              <h3>
              We are confident in our predictions for the first 25 days after that the support is less than ideal to have more confidence in.
              </h3>
              <h3>
              The model predicts the heatwaves from January and February of 2023. With more recent data, we can predict future heatwaves.
              </h3>
              <h4>
              The Heatwave classification has been done with <a href = "https://www.who.int/india/heat-wave">this website</a> as a reference and keeping in mind that Telangana's average maximum heatwave temperature is 44 degrees.
              </h4>
          </div>
          </div>
          </div>
         
          <br />
          <Divider size="xs" />
          <br />
          <Select
            size="lg"
            placeholder="Select a district to predict for"
            value={value} 
            onChange={setValue}
            data={[
              { value: 'adilabad', label: 'Adilabad' },
              { value: 'nizambad', label: 'Nizambad' },
              { value: 'warangal', label: 'Warangal' },
              { value: 'karimnagar', label: 'Karimnagar' },
              { value: 'khammam', label: 'Khammam' },
            ]}
          />
          <br />
          <Button onClick={sendData} size="md">Proceed</Button>
          <br />
          <br />
       
        </div>
   
    </>
  );
};

export default Home;
