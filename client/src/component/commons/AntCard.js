import React from 'react'
import {Col} from 'antd';
import {Card} from 'antd';
import { Link } from 'react-router-dom'

const AntCard = (props) => {
  const {Meta} = Card;
  if(props.landingpage){
      return (
      <Col lg={4} md={6} sm={12} xs={24}>
        <Link to={`/detail/${props.movieId}`}>
          <div>
            <a  href={`/movie/${props.movieId}`}>
              <Card
                hoverable
                style={{width: '100%'}}
                cover= {<img src={props.path} alt={props.title}/>}
                >
                <Meta title={props.title}/>
              </Card>
            </a>
        </div>
      </Link>
      </Col>
      )
  }else if(props.Detail){
      return(
      <Col lg={4} md={6} sm={12} xs={24}>
        <div>
          <Card
            hoverable
            style={{width : '100%'}}
            cover={<img src={props.path} alt={props.title}/>}
            >
            <Meta title={props.name}/>
          </Card>
        </div>
      </Col>
    )
  }
}

export default AntCard