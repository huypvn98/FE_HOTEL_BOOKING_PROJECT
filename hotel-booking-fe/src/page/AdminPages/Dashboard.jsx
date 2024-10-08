import { Button, Card, Row } from 'antd';
import React, { useRef } from 'react';
import MainChart from './MainChart';
import { ArrowDownOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils'
import ButtonGroup from 'antd/es/button/button-group';

const Dashboard = () => {
    const widgetChartRef1 = useRef(null)
    const renderCardInformationCard = (color, money, percent) =>{
        return(
            <Card style={{background:`${color}`, width:"300px", height:"164px", border:"0px", color:"white"}}>
                <Row style={{justifyContent:"space-between"}}>
                    <Row>
                    <p style={{fontSize:"25px"}}>{money}</p>
                    <p style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft:"10px", fontSize:"18px"}}>( {percent}% <ArrowDownOutlined />)</p> 
                    </Row>
                    <SettingOutlined></SettingOutlined>
                </Row>
                <Row style={{fontSize:"16px"}}>Users</Row>
                <CChartLine
              ref={widgetChartRef1}
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    border: {
                      display: false,
                    },
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
            </Card>
        )
    }
    return (
        <div>
        <div style={{display:"flex", gap:"24px", marginTop:"24px"}}>
        {renderCardInformationCard("#6261CC", "26k", "-12,4")}
        {renderCardInformationCard("#3D99F5", "$6.200", "40,9")}
        {renderCardInformationCard("#EDAD21", "2.49%", "84,7%")}
        {renderCardInformationCard("#DB5D5D", "2.49%", "84,7%")}
        </div>
        <Card style={{marginTop:"20px"}}>
        <Row style={{justifyContent:"space-between"}}>
          <div>
            <p style={{fontSize:"24px", fontWeight:"500"}}>Traffic</p>
            <p style={{fontSize:"14px",}}>January - July 2023</p>
          </div>
          <div>
            <Row>
            <ButtonGroup size='large'>
              <Button>Day</Button>
              <Button>Month</Button>
              <Button>Year</Button>
              </ButtonGroup>
              <Button style={{marginLeft:"10px", backgroundColor:"#5856D6", color:"white", borderColor:"#ddd"}} size='large' icon={<UploadOutlined />}></Button>
            </Row>
          </div>
        </Row>
        <MainChart></MainChart>
        </Card>
            
        </div>
    );
};

export default Dashboard;