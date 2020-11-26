/* eslint-disable no-unused-vars */

import React, {useState, useEffect} from 'react';
import '../styles/App.css';
import '../styles/p10Style.css';
import 'date-fns';
import NaviBar from '../fragments/TopNavigationBarFragment';
import Authentication from '../hooks/Authentication';
import AuthLoading from './authLoading';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextDataTable from "../fragments/TextDataTableFragment";
import PredictiveChartFragment from "../fragments/PredictiveChartFragment";
import API from '../hooks/ApiHooks';
import GlobalFunctions from '../hooks/GlobalFunctions';

/*eslint-enable */

const ParkingInfo = () => {
	const {getParkingStatus, getParkingData} = API();
	const {formattedFullDate} = GlobalFunctions();
    const {isLoggedIn} = Authentication();
	
	const [tableData, setTableData] = useState([["Total spaces", ""], ["Spaces in use", ""], ["Available spaces", ""]]);
	const [dataToday, setDataToday] = useState(null);
	const [dataWeekAgo, setDataWeekAgo] = useState(null);
	const [capacity, setCapacity] = useState(null);
	const [firstRender, setFirstRender] = useState(true);
	
	const zone = window.location.pathname.split('/').pop();
	
	let expectedDataDate = new Date();
	
	if (firstRender) {
		setFirstRender(false);
		
		getParkingStatus(zone).then( usageData => {
			setTableData([["Total spaces", ""+usageData["capacity"]], ["Spaces in use", ""+usageData["count"]], ["Available spaces", ""+(usageData["capacity"]-usageData["count"])]]);
			setCapacity(usageData["capacity"]);
		});
		
		getParkingData(zone, formattedFullDate(new Date())).then(json => {
			console.log(json)
			setDataToday(json);
		});
		
		expectedDataDate.setDate(expectedDataDate.getDate() - 7);
		getParkingData(zone, formattedFullDate(expectedDataDate)).then(json => {
			setDataWeekAgo(json);
		});
		
	}
	
    const ParkingInfoPage = () => {
		const {TopNavigationBar} = NaviBar();
		//const {onItemClickNavigate} = GlobalFunctions();
		return (
			<div>
				{TopNavigationBar()}
				<Box height="48px" display="flex" alignItems="center" padding="16px">
					<Typography variant="subtitle2" component="h1" align="left">Parking info</Typography>
				</Box>
				<Box px={2}>
					<TextDataTable data={tableData}/>
					{PredictiveChartFragment(dataToday, dataWeekAgo, capacity)}
					{/*<Grid container>
						<Button variant="outlined" align="left" onClick={()=>onItemClickNavigate('/parkinghistory/'+this.state.zone)}>
							{strings.history}
						</Button>
					</Grid>*/}
				</Box>
			</div>
		);
    }
	if (isLoggedIn()) {
		return ParkingInfoPage();
	} else {
		return <AuthLoading/>;
	}
		
};

export default ParkingInfo;