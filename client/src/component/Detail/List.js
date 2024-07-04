import React from 'react';
import AntCard from '../commons/AntCard';
import { Row } from 'antd';
import { IMAGE_BASE_URL } from '../Config';

const List = ({props}) => {
  return (
    <Row gutter={[10, 10]}>
      {props.map(targets => {
        if (targets.profile_path != null)
          return (
            <React.Fragment key={targets.id}>
              <AntCard
                Detail
                path={`${IMAGE_BASE_URL}w400${targets.profile_path}`}
                name={targets.name}
              />
            </React.Fragment>
          );
      })}
    </Row>
  )
}

export default List