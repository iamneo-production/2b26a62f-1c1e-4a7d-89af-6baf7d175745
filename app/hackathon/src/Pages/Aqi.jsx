import { Divider, Grid, Group, Button, Text, Select } from "@mantine/core";
import { Accordion, createStyles, Input, LoadingOverlay } from "@mantine/core";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import './Home.css'
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

const Aqi = () => {
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
    setSelectedDay(...selectedDay, [{year: 2019,month: 3, day: 1,}, {year: 2019,month: 3, day: 2,}]);
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
          <br />
          <Divider size="xs" />
          <br />
          <Select
            size="lg"
            placeholder="Select a district to predict for"
            value={value} 
            onChange={setValue}
            data={[
              { value: 'Adilabad', label: 'Adilabad' },
              { value: 'Nizambad', label: 'Nizambad' },
              { value: 'Warangal', label: 'Warangal' },
              { value: 'Karimnagar', label: 'Karimnagar' },
              { value: 'Khammam', label: 'Khammam' },
            ]}
          />
          <br />
          <Button onClick={sendData} size="md">Proceed</Button>
          <br />
          <br />
       
        </div>
      </div>
    </>
  );
};

export default Aqi;
