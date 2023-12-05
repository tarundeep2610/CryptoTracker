import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';

import { useGetCryptosQuery } from '../services/CryptoApi';
import { useStyleRegister } from 'antd/es/theme/internal';

const { Title } = Typography;

export default function HomePage(){
    const { data, isFetching } = useGetCryptosQuery(10);
    
    if(isFetching){
        return <Loader></Loader>
    }

    const globalStats = data?.data?.stats;

    return (
        <div>
            <Title level={2} className='heading'>Global Crypto Stats</Title>
            <Row>
                <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats?.total}></Statistic></Col>
                <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)}></Statistic></Col>
                <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats?.totalMarketCap)}></Statistic></Col>
                <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats?.total24hVolume)}></Statistic></Col>
                <Col span={12}><Statistic title='Total Markets' value={millify(globalStats?.totalMarkets)}></Statistic></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show more</Link> </Title>
            </div>
            <Cryptocurrencies simplified/>
            <div className="home-heading-container">
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={3} className='show-more'><Link to='/news'>Show more</Link> </Title>
            </div>
            <News simplified/>
        </div>
    )
}