import millify from "millify";
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function Cryptocurrencies({simplified}){

    const count= simplified?10:100;
    const {data: cryptosList, isFetching } = useGetCryptosQuery(count);

    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    if(isFetching){
        return <Loader></Loader>;
    }

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter( (coin) => {
            return coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        })

        setCryptos(filteredData);
    }, [cryptosList,searchTerm])

    return (
        <>
            { !simplified && <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}></Input>
            </div>}
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptos?.map( (currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key= {currency?.uuid}>
                        <Link to={`/crypto/${currency?.uuid}`}>
                            <Card title={`${currency?.rank}. ${currency?.name}`} extra={<img className="crypto-image" src={currency?.iconUrl}/>} hoverable>
                                <p>Price: {millify(currency?.price)}</p>
                                <p>Market Cap: {millify(currency?.marketCap)}</p>
                                <p>Daily Change: {millify(currency?.change)}</p>
                            </Card>
                        </Link>
                    </Col>
                ))
                    
                }
            </Row>
        </>
    )
}