import { Select, Typography, Row, Col, Card } from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useState } from 'react';
import Loader from './Loader';

const {Text,Title} = Typography;
const { Option } = Select;

const demoImage= 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

export default function News({simplified}){
    const[newsCategory, setNewsCategory]= useState('Cryptocurrency')

     const {data} = useGetCryptosQuery(100);

    const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory:newsCategory, count: simplified?6:12});

    if(isFetching){
        return <Loader></Loader>;
    }

    return (
        <Row gutter={[24,24]}>
             {!simplified && (
                <Col span={24}>
                    <Select showSearch className='select-news' placeholder='Select a Crypto' optionFilterProp='children' onChange={(value) => setNewsCategory(value)} filterOption= {(input,option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin,index) => <Option value={coin.name} key={index}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )
            }
            { cryptoNews?.articles?.map((news,i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className="news-image-container">
                                <Title className='news-title' level={4}>{news.title}</Title>
                                <img src={news?.urlToImage || demoImage} alt='news' style={{maxWidth:'150px', maxHeight:'100px'}}></img>
                            </div>
                            <p>
                                {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description};
                            </p>
                            <div className="provider-container">
                                <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
