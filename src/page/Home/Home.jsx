
import Banner from "./HomePage/Banner";
import SelectOperator from "./HomePage/SelectOperator";

const Home = () => {
    return (
        <>
        <Banner user={{name:'khalid hasan',  email:'khalidhasan9888@gmail.com'}}></Banner>

            <SelectOperator></SelectOperator>
        </>
    );
};

export default Home;