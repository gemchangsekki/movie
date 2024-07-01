import React from 'react'

function Mainimage(props) {
  return (
    <div style={{
      position: 'relative',
      backgroundImage: `url(${props.image})`, // backgound 속성: 이것 때문에 오류 발생 - 숏핸드와 논숏핸드 코드를 섞어서 쓰면 버그 발생이 쉬움
      width: '100%',
      height: '500px',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }}>
      <div style={{
        position: 'absolute',
        maxWidth: '500px',
        bottom: '25px',
        left: '25px',
        // backgroundColor: '#ff0'
        color: '#fff'
      }}>
        <h2>{props.title}</h2>
        <p>{props.overview}</p>
      </div>
    </div>
  )
}

export default Mainimage