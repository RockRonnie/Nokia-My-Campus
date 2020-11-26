import TabFragments from "./TabFragments";
import React, {Fragment, useState} from "react";
import Carousel from "react-material-ui-carousel";
import RestaurantHeatMapView from "../views/restaurantHeatMap";
import useStyle from "../styles/restaurantStyles";

const CarouselFragment = (props) => {
    const classes = useStyle();
    const {TabRestaurantChart, TabRestaurantDonut, TabRestaurantMenu, TabRestaurantWeek} = TabFragments();

    const Restaurant = () => {
        const [valueRestaurant] = useState(0);
        const [date, setDate] = useState(new Date());

        const handleDateChange = (data) => {
            setDate(data);
        };
//
        return (
                <Fragment>
                        <Carousel autoPlay={false} navButtonsAlwaysVisible={false}
                                  animation="slide" noWrap={true}>
                            <TabRestaurantMenu value={valueRestaurant} className={classes.Frag} index={0}/>
                            <TabRestaurantWeek value={valueRestaurant} className={classes.Frag} index={0}/>
                            <TabRestaurantChart value={valueRestaurant} className={classes.Frag} index={0} onDateChange={handleDateChange} date={date}/>
                            <RestaurantHeatMapView value={valueRestaurant} className={classes.Frag} index={0}/>
                            <TabRestaurantDonut value={valueRestaurant} className={classes.Frag} index={0} onDateChange={handleDateChange} date={date}/>
                        </Carousel>
                </Fragment>
        );
    };

    return {
        Restaurant: Restaurant,
    };

};
export default CarouselFragment;